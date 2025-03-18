import React, { FC, FormEvent, useEffect, useState } from 'react';
import { useCreateUser } from '../actions/Actions';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: FC<RegisterModalProps> = ({ isOpen, onClose }) => {

  useEffect(() => {
    if (isOpen) {
      setUsername('');
      setPassword('');
      setEmail('');
      setFullName('');
    }
  }, [isOpen]);
  // Estados locales para los campos del formulario
  const [nombre_usuario, setUsername] = useState('');
  const [contraseña, setPassword] = useState('');
  const [correo_electronico, setEmail] = useState('');
  const [nombre_completo, setFullName] = useState('');

  const {  mutate:crearUsuario, isPending, isError, error, data } = useCreateUser();

  // Manejo del envío del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const usuario: Usuario ={
      nombre_usuario, 
      contraseña, 
      correo_electronico, 
      nombre_completo, 
      tipo_usuario: 'usuario'
    };

    crearUsuario(usuario, {
      onError: (error) => {
          
      },
      onSuccess: (data) => {
        // Manejo de éxito local
      
      },
    });

   
  };

  // Si `isOpen` es false, no renderizamos nada
  if (!isOpen) return null;

  return (
    // Overlay (fondo oscuro semi-transparente)
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Contenedor del modal */}
      <div className="bg-red-400 relative w-80 rounded-lg p-6 text-gray-800 shadow-lg">
        
        {/* Botón de Cerrar */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-800 font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Regístrate</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Usuario"
            value={nombre_usuario}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border-2 border-gray-800 rounded"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border-2 border-gray-800 rounded"
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo_electronico}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border-2 border-gray-800 rounded"
            required
          />
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre_completo}
            onChange={(e) => setFullName(e.target.value)}
            className="p-2 border-2 border-gray-800 rounded"
          />
          
          <button
            type="submit"
            disabled={isPending}
            className="bg-gray-800 text-white mt-2 p-2 rounded hover:bg-gray-900"
          >
            ¡Listo!
          </button>
        </form>
        { (isError || 
          (data)) && (
          <div style={{ color: data.success ? 'green': 'red' }}>
            {data?.message}!!!
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterModal;
