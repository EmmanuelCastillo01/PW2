interface Usuario {
  id?: string;
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


  interface LoginP {

    correo_electronico: string;
    contraseña: string;

  
    }