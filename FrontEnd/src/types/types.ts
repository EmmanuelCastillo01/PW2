interface Usuario {
  id?: string;
  _id?: string;  
  nombre_usuario: string;
  contraseña: string;
  correo_electronico: string;
  nombre_completo: string;
  tipo_usuario: string;
}

interface ApiResponse {
  message: any;
  success: boolean;
  data: any;
}


interface LoginP {

  correo_electronico: string;
  contraseña: string;

}

interface Pelicula {
  _id?: string;
  titulo: string;
  sinopsis: string;
  imagen: string;
  calificacion_promedio: number;
}

