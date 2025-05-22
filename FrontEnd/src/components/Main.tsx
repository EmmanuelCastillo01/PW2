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
    
    logout();
    
    // Limpiar el localStorage
    localStorage.removeItem('usuario');
    console.log('Usuario eliminado de localStorage');
    // Redirigir a la página de inicio
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  //Con esto llamamos a la funcion para obtener las peliculas al cargar el componente
 // useEffect(() => {
   // cargarPeliculas();
    
  //}, []); // Traer las peliculas despues cuando las tenga que traer de la API
/* Películas DEMO mientras llega la API */
const peliculasDemo: Pelicula[] = [
  {
    _id: 'd1',
    titulo: 'Dune',
    sinopsis: '',
    imagen: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    calificacion_promedio: 4.2,
  },
  {
    _id: 'd2',
    titulo: 'Oppenheimer',
    sinopsis: '',
    imagen: 'https://www.inputmag.dk/wp-content/uploads/2024/03/Oppenheimer.webp',
    calificacion_promedio: 4.6,
  },
  {
    _id: 'd3',
    titulo: 'Spider-Verse',
    sinopsis: '',
    imagen: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    calificacion_promedio: 4.8,
  },
  {
    _id: 'd4',
    titulo: 'Wonka',
    sinopsis: '',
    imagen: 'https://image.tmdb.org/t/p/w500/qhb1qOilapbapxWQn9jtRCMwXJF.jpg',
    calificacion_promedio: 4.1,
  },
  {
    _id: 'd5',
    titulo: 'Godzilla Minus One',
    sinopsis: '',
    imagen: 'https://sm.ign.com/ign_latam/screenshot/default/godzilla-minus-one-3200638-1_ewkn.jpg',
    calificacion_promedio: 4.4,
  },
  {
    _id: 'd6',
    titulo: 'Napoleon',
    sinopsis: '',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOZIU2VqTCjXZffU0cvF3T-kXtEdStdI1ECg&s',
    calificacion_promedio: 3.9,
  },
  
];



  return (
    <div className="flex flex-col min-h-screen text-gray-800">
      {/* Barra Superior */}
      <header className="bg-black text-white p-4 flex items-center justify-between">
        {/* Zona Izquierda: */}
        <div className="flex items-center">
          {/* Botón */}
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

      {/*Cuerpo principal: Sidebar*/}
      <div className="flex flex-1">
        {/* Menú Lateral */}
        {sidebarOpen && (
          <div className="w-64 bg-black text-white transition-all duration-300 overflow-hidden">
            <div className="h-full flex flex-col p-4">
              <h2 className="text-3xl font-bold mb-6">Menú</h2>
              <nav className="flex flex-col gap-4">
                 {/*Cambio principal: links del menú funcionales*/}
                <button
                  className="text-left hover:underline"
                  onClick={()=> navigate('/Main')}
                >
                Inicio
                </button>
                <button
                  className="text-left hover:underline"
                  onClick={()=> navigate('/perfil')}
                >Mi Perfil
                </button>
                {user?.tipo_usuario === 'empleado' && (
                  <button className="text-left hover:underline" onClick={()=> navigate('/AdminPeliculas')}>Agregar Pelicula</button>)}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {peliculasDemo.slice(0, 3).map((p) => (
                  <PeliculaCard
                    key={p._id}
                    data={p}
                    heightClass={sidebarOpen ? 'h-44' : 'h-56'}
                  />
                ))}
              </div>
            </section>

            {/* Nuevos lanzamientos */}
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {peliculasDemo.slice(3, 6).map((p) => (
                  <PeliculaCard
                    key={p._id}
                    data={p}
                    heightClass={sidebarOpen ? 'h-44' : 'h-56'}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
