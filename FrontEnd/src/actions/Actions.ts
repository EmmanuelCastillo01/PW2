import { useMutation,UseMutationResult  } from '@tanstack/react-query';
import { createUser, ValidateUser } from '../services/userServices';

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