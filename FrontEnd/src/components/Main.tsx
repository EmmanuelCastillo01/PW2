import React, { useEffect, useState } from 'react';
import { useUserStore } from '../globaStorage';
import { useNavigate } from 'react-router-dom';
import { useObtenerPeliculas } from '../actions/Actions';
import PeliculaCard from './PeliculaCard';

export default function Main() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [busqueda, setBusqueda] = useState('');            // 🔍
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  /* Obtener películas */
  const {
    mutate: cargarPeliculas,
    data: respPeliculas,
    isPending,
    isError,
  } = useObtenerPeliculas();

  useEffect(() => { cargarPeliculas(); }, []);

  /* Orden → más nuevas primero */
  const peliculas: Pelicula[] = respPeliculas?.success
    ? respPeliculas.data.slice().reverse()
    : [];

  /* Filtrado por título */
  const filtro = busqueda.trim().toLowerCase();
  const pelisFiltradas = filtro
    ? peliculas.filter((p) => p.titulo.toLowerCase().includes(filtro))
    : peliculas;

  /* Agrupar de 3 */
  const chunk = (arr: Pelicula[], size = 3) =>
    arr.reduce<Pelicula[][]>((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('usuario');
    navigate('/');
  };

  if (!user) { navigate('/'); return null; }

  return (
    <div className="flex flex-col min-h-screen text-gray-800">
      {/* ---------- Header ---------- */}
      <header className="bg-black text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4">
            <span className="block w-6 h-0.5 bg-white mb-1" />
            <span className="block w-6 h-0.5 bg-white mb-1" />
            <span className="block w-6 h-0.5 bg-white" />
          </button>
          <h1 className="text-4xl font-bold">
            REVIEW<span className="text-red-600">XPERT</span>
          </h1>
        </div>

        {/* ---------- Buscador ---------- */}
        <div className="flex items-center">
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            type="text"
            placeholder="Buscar película..."
            className="p-2 rounded-l border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 bg-white text-black"
          />
          <button
            onClick={() => setBusqueda('')}
            className="bg-gray-700 text-white px-4 py-2 rounded-r hover:bg-gray-600"
          >
            Limpiar
          </button>
        </div>
      </header>

      {/* ---------- Layout ---------- */}
      <div className="flex flex-1">
        {/* ---------- Sidebar ---------- */}
        {sidebarOpen && (
          <aside className="w-64 bg-black text-white transition-all overflow-hidden">
            <div className="h-full flex flex-col p-4">
              <h2 className="text-3xl font-bold mb-6">Menú</h2>
              <nav className="flex flex-col gap-4">
                <button className="text-left hover:underline" onClick={() => navigate('/Main')}>
                  Inicio
                </button>
                <button className="text-left hover:underline" onClick={() => navigate('/perfil')}>
                  Mi Perfil
                </button>
                {user.tipo_usuario === 'empleado' && (
                  <button
                    className="text-left hover:underline"
                    onClick={() => navigate('/AdminPeliculas')}
                  >
                    Agregar Película
                  </button>
                )}
                <button className="text-left hover:underline" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </nav>
            </div>
          </aside>
        )}

        {/* ---------- Contenido ---------- */}
        <main className="flex-1 flex flex-col bg-red-400 p-6">
          <h2 className="text-2xl font-semibold mb-4">🎞️ Películas</h2>

          {isPending && <p>Cargando...</p>}
          {isError && <p>Error al obtener películas</p>}
          {!isPending && pelisFiltradas.length === 0 && (
            <p className="italic">No hay películas para mostrar</p>
          )}

          {chunk(pelisFiltradas).map((fila, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6"
            >
                          {fila.map((p) => (
              <div key={p._id} onClick={() => navigate(`/pelicula/${p._id}`)} className="cursor-pointer">
                <PeliculaCard data={p} heightClass={sidebarOpen ? 'h-44' : 'h-56'} />
              </div>
            ))}

            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
