import { useMutation,UseMutationResult  } from '@tanstack/react-query';
import { createUser } from '../services/userServices';

export function useCreateUser() {
 
  return useMutation<any, Error, Usuario>({
    mutationFn: createUser,
    onSuccess: (data) => {
   
      
    },
    onError: (error) => {
      
    },
    
  });
}