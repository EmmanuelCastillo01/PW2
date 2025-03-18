interface Usuario {
  nombre_usuario: string;
  contraseña: string;
  correo_electronico: string;
  nombre_completo: string;
  tipo_usuario: string;
  }

  interface ApiResponse{
    success: boolean;
    data: any;
  }