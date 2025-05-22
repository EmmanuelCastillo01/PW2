import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { createUser, ObtenerPeliculas, ValidateUser,  updateUser, createPelicula } from '../services/userServices';

export function useCreateUser() {

  return useMutation<any, Error, Usuario>({
    mutationFn: createUser,
    onSuccess: (data) => {


    },
    onError: (error) => {

    },

  });
}

//validar usuario
export function validarUsuario() {

  return useMutation<any, Error, LoginP>({
    mutationFn: ValidateUser,
    onSuccess: (data) => {
      // Handle success
    },
    onError: (error) => {
      // Handle error
      console.error(error);
    },
  });
}

//Obtener Peliculas
export function useObtenerPeliculas() {
  return useMutation<any, Error, void>({
    mutationFn: ObtenerPeliculas,
    onSuccess: (data) => {
    
    },
    onError: (error) => {
      console.error('Error al obtener películas:', error.message);
    },
  });
}

/* ---------- Update perfil ---------- */
/* ---------- Update perfil ---------- */
export function useUpdateUser() {
  return useMutation<ApiResponse, Error, { id: string; data: Partial<Usuario> }>({
    mutationFn: updateUser,
    onSuccess: () => {
      /* si quieres lógica global ponla aquí */
    },
    onError: (error) => {
      console.error('Error al actualizar usuario', error);
    },
  });
}



export function useCreatePelicula() {
  return useMutation<ApiResponse, Error, { titulo: string; sinopsis: string; imagen: string }>({
    mutationFn: createPelicula,
  });
}

