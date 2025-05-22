
  // Función para crear usuario
  export async function createUser(user: Usuario): Promise<any> {
    const response = await fetch('http://localhost:8080/users/usuario/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    
    return response.json();
  }
  
  // Función para Validar Usuario
  export async function ValidateUser(user: LoginP): Promise<any> {
    const response = await fetch('http://localhost:8080/users/usuario/validar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return response.json();
  }

  // Función para Validar Usuario
  export async function ObtenerPeliculas(): Promise<any> {
    const response = await fetch('http://localhost:8080/movies/pelicula', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
  }




/** PATCH – actualiza solo los campos enviados */
export async function updateUser(payload: { id: string; data: Partial<Usuario>;}): Promise<ApiResponse> {
  const { id, data } = payload;

  const res = await fetch(`http://localhost:8080/users/usuario/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return res.json();
}

/*  createUser, ValidateUser y ObtenerPeliculas permanecen igual  */

  /*
  export async function fetchUsers(): Promise<any[]> {
    const response = await fetch('http://localhost:3000/api/users');
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios');
    }
    return response.json();
  }
  */
  // Puedes exportar más funciones: updateUser, deleteUser, etc.
  