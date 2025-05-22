export async function fetchComentarios(peliculaId: string): Promise<ApiResponse> {
  const res = await fetch(`http://localhost:8080/comments/comentarios/pelicula/${peliculaId}`);
  return res.json();
}

export async function createComentario(body: {
  pelicula_id: string;
  usuario_id: string;
  nombre_usuario: string;
  comentario: string;
  calificacion: number;
}): Promise<ApiResponse> {
  const res = await fetch('http://localhost:8080/comments/comentarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}
