

export function mapUser(u: any): Usuario {
  return {
    id: u._id ?? u.id,        // ← asegura la clave id
    _id: u._id ?? u.id,
    nombre_usuario: u.nombre_usuario,
    contraseña: u.contraseña,
    correo_electronico: u.correo_electronico,
    nombre_completo: u.nombre_completo,
    tipo_usuario: u.tipo_usuario,
  };
}


