import React, { useState, useEffect } from 'react';

interface EditarPerfilModalProps {
  isOpen: boolean;
  onClose: () => void;
  nombreCompletoInicial: string;
  nombreUsuarioInicial: string;
  correoInicial: string;
  onSave: (data: {
    nombre_completo: string;
    nombre_usuario: string;
    correo_electronico: string;
    contraseña?: string;
  }) => void;
}

const EditarPerfilModal: React.FC<EditarPerfilModalProps> = ({
  isOpen,
  onClose,
  nombreCompletoInicial,
  nombreUsuarioInicial,
  correoInicial,
  onSave,
}) => {
  const [nombreCompleto, setNombreCompleto] = useState(nombreCompletoInicial);
  const [nombreUsuario, setNombreUsuario]   = useState(nombreUsuarioInicial);
  const [correo, setCorreo]                 = useState(correoInicial);
  const [pass, setPass]                     = useState('');

  /* resetea campos cuando se abra */
  useEffect(() => {
    if (isOpen) {
      setNombreCompleto(nombreCompletoInicial);
      setNombreUsuario(nombreUsuarioInicial);
      setCorreo(correoInicial);
      setPass('');
    }
  }, [isOpen, nombreCompletoInicial, nombreUsuarioInicial, correoInicial]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-6">Editar información</h2>

        <label className="block text-sm font-medium mb-1">Nombre completo</label>
        <input
          value={nombreCompleto}
          onChange={e => setNombreCompleto(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block text-sm font-medium mb-1">Nombre de usuario</label>
        <input
          value={nombreUsuario}
          onChange={e => setNombreUsuario(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block text-sm font-medium mb-1">Correo electrónico</label>
        <input
          type="email"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block text-sm font-medium mb-1">Nueva contraseña</label>
        <input
          type="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          placeholder="••••••••"
          className="w-full p-2 border rounded mb-6"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button
            onClick={() =>
              onSave({
                nombre_completo: nombreCompleto,
                nombre_usuario: nombreUsuario,
                correo_electronico: correo,
                ...(pass && { contraseña: pass }),
              })
            }
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarPerfilModal;
