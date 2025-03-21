import React, { useEffect, useState } from 'react';
import { useUserStore } from '../globaStorage';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useObtenerPeliculas } from '../actions/Actions';
import PeliculaCard from './PeliculaCard';

export default function Main() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const { user, logout } = useUserStore();

  //implementamos la funcion para traer las peliculas del API
  const { mutate: cargarPeliculas, isPending, isError, error, data: listadePeliculas } = useObtenerPeliculas();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    // 1) Llama a la acción de cerrar sesión en la store (o tu lógica manual)
    logout();
    // 2) Redirige a la ruta donde esté tu Login, por ejemplo '/'
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  //Con esto llamamos a la funcion para obtener las peliculas al cargar el componente
  useEffect(() => {
    cargarPeliculas();
    
  }, []);



  return (
    <div className="flex flex-col min-h-screen text-gray-800">
      {/* Barra Superior */}
      <header className="bg-black text-white p-4 flex items-center justify-between">
        {/* Zona Izquierda: Botón Hamburguesa + Título */}
        <div className="flex items-center">
          {/* Botón hamburguesa */}
          <button onClick={toggleSidebar} className="focus:outline-none mr-4">
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </button>

          {/* Marca (Título) */}
          <h1 className="text-4xl font-bold">
            REVIEW<span className="text-red-600">XPERT</span>
          </h1>
        </div>

        {/* Zona Derecha: Barra de búsqueda */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Buscar película..."
            className="p-2 rounded-l border border-gray-700 
             focus:outline-none focus:ring-1 focus:ring-gray-700
             bg-white text-black"
          />
          <button className="bg-gray-700 text-white px-4 py-2 rounded-r hover:bg-gray-600">
            Buscar
          </button>
        </div>
      </header>

      {/* Cuerpo principal: Sidebar (si está abierto) + Secciones */}
      <div className="flex flex-1">
        {/* Menú Lateral */}
        {sidebarOpen && (
          <div className="w-64 bg-black text-white transition-all duration-300 overflow-hidden">
            <div className="h-full flex flex-col p-4">
              <h2 className="text-3xl font-bold mb-6">Menú</h2>
              <nav className="flex flex-col gap-4">
                <button className="text-left hover:underline">Inicio</button>
                <button className="text-left hover:underline">Categorías</button>
                <button className="text-left hover:underline">Mi Lista</button>
                {user?.tipo_usuario === 'empleado' && (
                  <button className="text-left hover:underline">Agregar Pelicula</button>)}
                <button className="text-left hover:underline" onClick={handleLogout}>Cerrar Sesion</button>
              </nav>
            </div>
          </div>
        )}

        {/* Contenido Principal */}
        <div className="flex-1 flex flex-col bg-red-400 p-6">
          <div className="flex flex-col gap-8">
            {/* Tendencias */}
            <section>
              <h2 className="text-2xl font-semibold mb-2">Tendencias</h2>
              <div className="grid grid-cols-3 gap-4">
                {listadePeliculas && listadePeliculas?.data && listadePeliculas.data.length > 0 ? (
                  listadePeliculas.data.map((pelicula : Pelicula) => (
                   
                    <PeliculaCard key={pelicula._id} data={pelicula}  heightClass={sidebarOpen ? 'h-44' : 'h-56'}  />
                  ))
                ) : (
                  <p>No hay películas para mostrar</p>
                )}
              </div>
            </section>

            {/* Populares */}
            <section>
              <h2 className="text-2xl font-semibold mb-2">Populares</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-black text-white h-40 flex items-center justify-center">
                  Película 4
                </div>
                <div className="bg-black text-white h-40 flex items-center justify-center">
                  Película 5
                </div>
                <div className="bg-black text-white h-40 flex items-center justify-center">
                  Película 6
                </div>
              </div>
            </section>

            {/* Nuevos lanzamientos */}
            <section>
              <h2 className="text-2xl font-semibold mb-2">Nuevos lanzamientos</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-black text-white h-40 flex items-center justify-center">
                  Película 7
                </div>
                <div className="bg-black text-white h-40 flex items-center justify-center">
                  Película 8
                </div>
                <div className="bg-black text-white h-40 flex items-center justify-center">
                  Película 9
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
