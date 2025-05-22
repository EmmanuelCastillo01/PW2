// filepath: src/components/DetallePelicula.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '../globaStorage';

interface Pelicula {
  _id: string;
  titulo: string;
  sinopsis: string;
  imagen: string;
  calificacion_promedio: number;
}

export default function DetallePelicula() {
  const { id } = useParams();                     // ← /pelicula/:id
  const { user, logout } = useUserStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const navigate = useNavigate();

  /* --- fetch por ID --- */
  useEffect(() => {
    fetch(`http://localhost:8080/movies/pelicula/${id}`)
      .then((r) => r.json())
      .then((json) => json.success && setPelicula(json.data))
      .catch(() => {});
  }, [id]);

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
      </header>

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
                <button
                  className="text-left hover:underline"
                  onClick={() => {
                    logout();
                    localStorage.removeItem('usuario');
                    navigate('/');
                  }}
                >
                  Cerrar Sesión
                </button>
              </nav>
            </div>
          </aside>
        )}

        {/* ---------- Contenido ---------- */}
        <main className="flex-1 bg-red-100 p-8 flex flex-col items-center">
          {!pelicula && <p>Cargando...</p>}

          {pelicula && (
            <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6 space-y-6">
              <img
                src={pelicula.imagen}
                alt={pelicula.titulo}
                className="w-full h-80 object-cover rounded-md"
              />
              <h2 className="text-3xl font-bold">{pelicula.titulo}</h2>
              <p className="text-gray-700">{pelicula.sinopsis}</p>

              <div className="text-lg font-semibold">
                ⭐ Calificación promedio: {pelicula.calificacion_promedio.toFixed(1)} / 5
              </div>

              {/* Comentarios (mock) */}
              <section>
                <h3 className="text-2xl font-semibold mb-2">💬 Comentarios</h3>
                <div className="bg-gray-100 p-4 rounded text-gray-600 italic">
                  (Aquí aparecerán los comentarios)
                </div>

                <textarea
                  disabled
                  placeholder="Deja tu comentario (próximamente)…"
                  className="w-full mt-4 p-2 border rounded bg-gray-200"
                  rows={3}
                />
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
