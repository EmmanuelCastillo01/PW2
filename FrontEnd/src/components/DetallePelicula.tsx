// filepath: src/components/DetallePelicula.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '../globaStorage';
import { useComentarios, useCreateComentario } from '../actions/Actions';


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



/* ------- hooks dentro del componente ------- */
const { mutate: cargarComentarios, data: respComentarios } = useComentarios();
const {
  mutate: enviarComentario,
  isPending: enviando,
} = useCreateComentario();

const [texto, setTexto] = useState('');
const [estrellas, setEstrellas] = useState(5);

/* Cargar comentarios cada vez que llega la película */
useEffect(() => {
  if (pelicula?._id) cargarComentarios(pelicula._id);
}, [pelicula]);

/* Lista ya preparada */
const comentarios = respComentarios?.success ? respComentarios.data : [];

/* Promedio en tiempo real */
const promedio = 
comentarios.length > 0
    ? comentarios.reduce((s: any, c: { calificacion: any; }) => s + c.calificacion, 0) / comentarios.length
    : pelicula?.calificacion_promedio ?? 0;


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
                ⭐ Calificación promedio: {promedio.toFixed(1)} / 5
                {comentarios.length > 0 && (
                    <span className="text-sm text-gray-600"> ({comentarios.length} votos)</span>
                )}
                </div>


              {/* Comentarios (mock) */}
              <section>
                <h3 className="text-2xl font-semibold mb-4">💬 Comentarios</h3>

                {/* Lista */}
                {comentarios.length === 0 && <p className="italic text-gray-600">Sin comentarios aún.</p>}

                {comentarios.map((c: any) => (
                    <div key={c._id} className="mb-4 border-b pb-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="font-semibold">{c.nombre_usuario}</span>
                        <span>•</span>
                        <span>{'⭐'.repeat(c.calificacion)}</span>
                    </div>
                    <p>{c.comentario}</p>
                    </div>
                ))}

                {/* ---- Formulario ---- */}
                <div className="mt-6 space-y-2">
                    <label className="block font-medium">Tu calificación</label>
                    <select
                    value={estrellas}
                    onChange={(e) => setEstrellas(Number(e.target.value))}
                    className="p-2 border rounded w-24"
                    >
                    {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                        {n} ⭐
                        </option>
                    ))}
                    </select>

                    <textarea
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Escribe tu comentario…"
                    className="w-full p-2 border rounded"
                    rows={3}
                    />

                    <button
                    disabled={enviando || texto.trim() === ''}
                    onClick={() =>
                        enviarComentario(
                        {
                            pelicula_id: pelicula!._id,
                            usuario_id: user.id!,          // tu store debe tener id
                            nombre_usuario: user.nombre_usuario,
                            comentario: texto,
                            calificacion: estrellas,
                        },
                        {
                            onSuccess: (r) => {
                            if (r.success) {
                                setTexto('');
                                setEstrellas(5);
                                cargarComentarios(pelicula!._id); // refrescar lista
                            } else {
                                alert(r.message);
                            }
                            },
                            onError: () => alert('Error al enviar comentario'),
                        }
                        )
                    }
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
                    >
                    {enviando ? 'Enviando…' : 'Publicar'}
                    </button>
                </div>
                </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
