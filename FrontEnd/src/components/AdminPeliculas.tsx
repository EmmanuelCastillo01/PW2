import React, { useState } from 'react';
import { useUserStore } from '../globaStorage';
import { useNavigate } from 'react-router-dom';
import { useCreatePelicula } from '../actions/Actions';
import PeliculaCard from './PeliculaCard';          // ya lo tienes
import { Pelicula } from '../types';


export default function AdminPeliculas() {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [seccionActiva, setSeccionActiva] = useState<'agregar' | 'gestionar'>('agregar');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('usuario');
    navigate('/');
  };

    const [titulo, setTitulo]       = useState('');
    const [sinopsis, setSinopsis]   = useState('');
    const [imagen, setImagen]       = useState('');

    const { mutate: guardarPelicula, isPending } = useCreatePelicula();

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen text-gray-800">
      {/* Header */}
      <header className="bg-black text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="focus:outline-none mr-4">
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </button>
          <h1 className="text-4xl font-bold">
            REVIEW<span className="text-red-600">XPERT</span>
          </h1>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-64 bg-black text-white transition-all duration-300 overflow-hidden">
            <div className="h-full flex flex-col p-4">
              <h2 className="text-3xl font-bold mb-6">Menú</h2>
              <nav className="flex flex-col gap-4">
                <button className="text-left hover:underline" onClick={() => navigate('/Main')}>Inicio</button>
                <button className="text-left hover:underline" onClick={() => navigate('/perfil')}>Mi Perfil</button>
                {user?.tipo_usuario === 'empleado' && (
                  <button className="text-left hover:underline" onClick={() => navigate('/AdminPeliculas')}>Agregar Película</button>
                )}
                <button className="text-left hover:underline" onClick={handleLogout}>Cerrar Sesión</button>
              </nav>
            </div>
          </div>
        )}

        {/* Contenido principal */}
        <main className="flex-1 bg-red-100 p-8">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-black">🎬 Administrar Películas</h1>

            {/* Navegación entre secciones */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setSeccionActiva('agregar')}
                className={`px-4 py-2 rounded-full font-semibold ${
                  seccionActiva === 'agregar' ? 'bg-black text-white' : 'bg-gray-200 text-black'
                }`}
              >
                ➕ Agregar Película
              </button>
              <button
                onClick={() => setSeccionActiva('gestionar')}
                className={`px-4 py-2 rounded-full font-semibold ${
                  seccionActiva === 'gestionar' ? 'bg-black text-white' : 'bg-gray-200 text-black'
                }`}
              >
                🛠️ Eliminar / Actualizar
              </button>
            </div>

            {/* Sección: Agregar Película */}
            {seccionActiva === 'agregar' && (
              <div className="space-y-4">
                {/* Título */}
                <div>
                  <label className="block font-medium mb-1">🎞️ Título de la película</label>
                  <input
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    type="text"
                    placeholder="Ej. El origen"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                {/* Sinopsis */}
                <div>
                  <label className="block font-medium mb-1">📝 Sinopsis</label>
                  <textarea
                    value={sinopsis}
                    onChange={(e) => setSinopsis(e.target.value)}
                    placeholder="Breve descripción..."
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={4}
                    required
                  />
                </div>

                {/* URL imagen */}
                <div>
                  <label className="block font-medium mb-1">🖼️ URL de la imagen</label>
                  <input
                    value={imagen}
                    onChange={(e) => setImagen(e.target.value)}
                    type="text"
                    placeholder="https://..."
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                {/* ----- Pre-visualización ----- */}
                {titulo && imagen && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Pre-visualización</h3>
                    <PeliculaCard
                      data={{
                        _id: 'preview',
                        titulo,
                        sinopsis,
                        imagen,
                        calificacion_promedio: 0,
                      } as Pelicula}
                      heightClass="h-56"
                    />
                  </div>
                )}

                {/* Botón Guardar */}
                <button
                  disabled={isPending}
                  onClick={() =>
                    guardarPelicula(
                      { titulo, sinopsis, imagen },
                      {
                        onSuccess: (resp) => {
                          if (resp.success) {
                            alert('Película guardada ✅');
                            setTitulo('');
                            setSinopsis('');
                            setImagen('');
                          } else {
                            alert(resp.message);
                          }
                        },
                        onError: () => alert('Error al guardar película'),
                      }
                    )
                  }
                  className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {isPending ? 'Guardando...' : 'Guardar Película'}
                </button>
              </div>
            )}


            {/* Sección: Eliminar / Actualizar Película */}
            {seccionActiva === 'gestionar' && (
              <div className="text-center text-gray-600">
                <p>🔧 Aquí podrás eliminar o actualizar películas existentes.</p>
                <p className="mt-2 italic">Esta sección aún no tiene funcionalidad implementada.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
