import React, { FC, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Importar useNavigate
import RegisterModal from './RegisterModal';
import { useMutation } from '@tanstack/react-query';
import { ValidateUser } from '../services/userServices';
import { validarUsuario } from '../actions/Actions';

interface LoginProps {
  // Define props si las necesitas
}

//const {  mutate:crearUsuario, isPending, isError, error, data } = useCreateUser();

const Login: FC<LoginProps> = () => {
  const [correo_electronico, setEmail] = useState<string>('');
  const [contraseña, setPassword] = useState<string>('');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);


  const {  mutate:LoginUsuario, isPending, isError, error, data } = validarUsuario();

  const navigate = useNavigate();
    // Lógica de autenticación
   // console.log(email, password);


  // Manejo del envío del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const usuario: LoginP ={
        contraseña, 
        correo_electronico, 
      };

    LoginUsuario(usuario, {
      onError: (error) => {
          
      },
      onSuccess: (data) => {
        // Manejo de éxito local
        if(data.success){

        navigate('/Main');
        }
        else{
            console.log("Usuario no encontrado");
        }
      },
    });

   
  };



  const openRegisterModal = () => setIsRegisterOpen(true);
  const closeRegisterModal = () => setIsRegisterOpen(false);

  return (
    <div className="flex min-h-screen">
      {/* Panel izquierdo */}
      <div className="flex-1 bg-black flex items-center justify-center">
        <h1 className="text-white text-5xl font-bold">
          REVIEW<span className="text-red-600">XPERT</span>
        </h1>
      </div>

      {/* Panel derecho */}
      <div className="flex-1 flex flex-col items-center justify-center bg-red-400 p-8 text-gray-800">
        <h2 className="text-3xl font-semibold mb-6">¡Bienvenido!</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">Correo electrónico</label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-700"
              placeholder="Correo electrónico"
              value={correo_electronico}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">Contraseña</label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-700"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gray-800 text-white w-full py-2 rounded hover:bg-gray-900"
  >
            Iniciar sesión
          </button>
        </form>

        <p className="mt-4">
          ¿Todavía no tienes una cuenta?{' '}
          <button 
            onClick={openRegisterModal} 
            className="font-bold underline text-gray-800">
            Regístrate
          </button>
        </p>
      </div>
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={closeRegisterModal}
      />
    </div>
  );
};

export default Login;
