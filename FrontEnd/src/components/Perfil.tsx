import React, { useState } from 'react';
import { useUserStore } from '../globaStorage';
import { useNavigate } from 'react-router-dom';
import PeliculaCard from './PeliculaCard';
import EditarPerfilModal from './EditarPerfilModal'; // Importa el modal
import { useUpdateUser } from '../actions/Actions';
import { mapUser } from '../utils/mapUser';

 

export default function Perfil() {
  
  const { user,setUser,logout } = useUserStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Dentro del componente Perfil
  const [modalAbierto, setModalAbierto] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = () => {
    logout();

        // Limpiar el localStorage
    localStorage.removeItem('usuario');
    console.log('Usuario eliminado de localStorage');
    navigate('/');
  };


//handleUpdateUser
const mutUpdateUser = useUpdateUser();       

const handleSave = (dataUpdate: {
  nombre_completo: string;
  nombre_usuario: string;
  correo_electronico: string;
  contraseña?: string;
}) => {
  if (!user?.id) return;

    mutUpdateUser.mutate(
      { id: user.id, data: dataUpdate },
      {
        onSuccess: (resp) => {
          if (resp.success) {
              const normalizado = mapUser(resp.data);   // 👈
              setUser(normalizado);
              localStorage.setItem('usuario', JSON.stringify(normalizado));
              setModalAbierto(false);

          } else {
            alert(resp.message);
          }
        },
        onError: () => alert('Error al actualizar perfil'),
      }
    );
  };

  // Películas simuladas 
  const peliculasDummy = [
    {
      id: 1,
      titulo: 'Inception',
      comentario: 'Una obra maestra visual y narrativa.',
      imagen: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
      sinopsis: 'Un ladrón que roba secretos mediante el uso de la tecnología de sueños.',
      calificacion_promedio: 4.5,
    },
    {
      id: 2,
      titulo: 'Interstellar',
      comentario: 'Una odisea emocional a través del espacio.',
      imagen: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
      sinopsis: 'Un grupo de astronautas viaja a través de un agujero de gusano.',
      calificacion_promedio: 4.7,
    },
  ];

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
                  <button className="text-left hover:underline"  onClick={()=> navigate('/AdminPeliculas')}>Agregar Película</button>
                )}
                <button className="text-left hover:underline" onClick={handleLogout}>Cerrar Sesión</button>
              </nav>
            </div>
          </div>
        )}

        {/* Contenido principal */}
        <main className="flex-1 bg-red-100 p-8 space-y-10">
          {/* Información del Usuario */}
          <section className="bg-gradient-to-r from-white to-red-100 shadow-lg rounded-2xl p-8 w-full max-w-5xl mx-auto">
            <h2 className="text-3xl font-extrabold text-black mb-6">Información del Usuario</h2>
            <div className="space-y-2 text-lg">
              <p><span className="font-semibold">👤 Nombre completo:</span> {user.nombre_completo}</p>
              <p><span className="font-semibold">🧾 Nombre de usuario:</span> {user.nombre_usuario}</p>
              <p><span className="font-semibold">📧 Correo:</span> {user.correo_electronico}</p>
            </div>
            <button
          className="mt-6 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-900"
          onClick={() => setModalAbierto(true)}
        >
          ✏️ Editar información
        </button>

          </section>

          {/* Lista de Reseñas */}
          <section className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">📝 Mis Reseñas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {peliculasDummy.map((pelicula) => (
                <PeliculaCard
                  key={pelicula.id}
                  data={{
                    _id: pelicula.id.toString(),
                    titulo: pelicula.titulo,
                    sinopsis: pelicula.sinopsis,
                    imagen: pelicula.imagen,
                    calificacion_promedio: pelicula.calificacion_promedio,
                  }}
                />
              ))}
            </div>
          </section>

          {/* Películas Favoritas */}
          <section className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">❤️ Películas Favoritas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {peliculasDummy.map((pelicula) => (
                <PeliculaCard
                  key={`fav-${pelicula.id}`}
                  data={{
                    _id: pelicula.id.toString(),
                    titulo: pelicula.titulo,
                    sinopsis: pelicula.sinopsis,
                    imagen: pelicula.imagen,
                    calificacion_promedio: pelicula.calificacion_promedio,
                  }}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
              <EditarPerfilModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSave={handleSave}
        nombreCompletoInicial={user.nombre_completo}
        nombreUsuarioInicial={user.nombre_usuario}
        correoInicial={user.correo_electronico}
      />


    </div>
  );
}
