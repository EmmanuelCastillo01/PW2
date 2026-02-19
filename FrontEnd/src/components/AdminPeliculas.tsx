import React, { useEffect, useState } from 'react';
import { useUserStore } from '../globaStorage';
import { useNavigate } from 'react-router-dom';
import { useCreatePelicula, useListPeliculas, useUpdatePelicula, useDeletePelicula,} from '../actions/Actions';
import PeliculaCard from './PeliculaCard';          // ya lo tienes
import { Pelicula } from '../types';


export default function AdminPeliculas() {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [seccionActiva, setSeccionActiva] = useState<'agregar' | 'gestionar'>('agregar');
const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

const resetFormulario = () => {
  setTitulo('');
  setSinopsis('');
  setImagen('');
  setSeleccionada(null);
};


  /* carga lista al cambiar a la sección gestionar */
useEffect(() => {
  /* Siempre limpia los campos cuando se cambia de sección */
  resetFormulario();

  /* Si entras en Gestionar, carga la lista */
  if (seccionActiva === 'gestionar') {
    cargarLista(undefined, {
      onSuccess: (r) => r.success && setPeliculas(r.data),
    });
  }
}, [seccionActiva]);



const handleSelect = (id: string) => {
  const p = peliculas.find((x) => x._id === id) || null;
  setSeleccionada(p);
  if (p) {
    setTitulo(p.titulo);
    setSinopsis(p.sinopsis);
    setImagen(p.imagen);
  }
};

const handleActualizar = () => {
  if (!seleccionada?._id) return;

  actualizarPelicula(
    { id: seleccionada._id, data: { titulo, sinopsis, imagen } },
    {
      onSuccess: (r) => {
        if (r.success) {
          alert('Actualizada ✅');

          /* 1️⃣ actualiza la lista local */
          setPeliculas((prev) =>
            prev.map((p) => (p._id === seleccionada._id ? r.data : p))
          );

          /* 2️⃣ limpia campos y selección */
          resetFormulario();

          /* 3️⃣ recarga lista del backend (opcional) */
          cargarLista();
        }
      },
    }
  );
};


const handleEliminar = () => {
  if (!seleccionada?._id) return;
  if (!confirm('¿Seguro?')) return;

  eliminarPelicula(seleccionada._id, {
    onSuccess: (r) => {
      if (r.success) {
        alert('Eliminada ✅');

        /* 1️⃣ quita de la lista local */
        setPeliculas((prev) => prev.filter((p) => p._id !== seleccionada._id));

        /* 2️⃣ limpia campos y selección */
        resetFormulario();

        /* 3️⃣ (opcional) recarga lista del backend */
        cargarLista();
      }
    },
  });
};


const handleCancelar = () => resetFormulario();
  /* ---- cerrar sesión ---- */


  const handleLogout = () => {
    logout();
    localStorage.removeItem('usuario');
    navigate('/');
  };

    const [titulo, setTitulo]       = useState('');
    const [sinopsis, setSinopsis]   = useState('');
    const [imagen, setImagen]       = useState('');

    const { mutate: guardarPelicula, isPending } = useCreatePelicula();
    const [peliculas, setPeliculas]   = useState<Pelicula[]>([]);
    const [seleccionada, setSeleccionada] = useState<Pelicula | null>(null);
    /* ---- gestionar ---- */
    const { mutate: cargarLista, data: listaResp } = useListPeliculas();
    const { mutate: actualizarPelicula, isPending: updPend } = useUpdatePelicula();
    const { mutate: eliminarPelicula,  isPending: delPend } = useDeletePelicula();

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
            {/* Sección: Eliminar / Actualizar Película */}
{seccionActiva === 'gestionar' && (
  <>
    {/* Dropdown */}
    <div className="mb-4">
      <label className="block font-medium mb-1">🎬 Selecciona una película</label>
      <select
        className="w-full p-2 border rounded"
        defaultValue=""
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="" disabled>
          -- Elegir --
        </option>
        {peliculas.map((p) => (
          <option key={p._id} value={p._id}>
            {p.titulo}
          </option>
        ))}
      </select>
    </div>

    {/* Si hay una seleccionada, muestra formulario y pre-visualización */}
    {seleccionada && (
      <div className="space-y-4">
        {/* Título */}
        <div>
          <label className="block font-medium mb-1">🎞️ Título</label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Sinopsis */}
        <div>
          <label className="block font-medium mb-1">📝 Sinopsis</label>
          <textarea
            value={sinopsis}
            onChange={(e) => setSinopsis(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        {/* Imagen */}
        <div>
          <label className="block font-medium mb-1">🖼️ URL imagen</label>
          <input
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Pre-visualización */}
        <div className="mt-4">
          <PeliculaCard
            data={{
              _id: 'prev',
              titulo,
              sinopsis,
              imagen,
              calificacion_promedio: seleccionada.calificacion_promedio,
            }}
            heightClass="h-56"
          />
        </div>

        {/* Botones */}
        <div className="flex gap-4 mt-4">
          <button
            disabled={updPend}
            onClick={handleActualizar}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Actualizar
          </button>
          <button
            disabled={delPend}
            onClick={handleEliminar}
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            Eliminar
          </button>
          <button
            onClick={handleCancelar}
            className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    )}

    {!seleccionada && (
      <p className="text-gray-600 italic">Selecciona una película para editarla o eliminarla.</p>
    )}
  </>
)}

          </div>
        </main>
      </div>
    </div>
  );
}
