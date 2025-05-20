import React from 'react';

interface EditarPerfilModalProps {
  isOpen: boolean;
  onClose: () => void;
  nombreCompleto: string;
  nombreUsuario: string;
  onSave: (nombreCompleto: string, nombreUsuario: string) => void;
}

const EditarPerfilModal: React.FC<EditarPerfilModalProps> = ({
  isOpen,
  onClose,
  nombreCompleto,
  nombreUsuario,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Información</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">Nombre completo</label>
          <input
            type="text"
            value={nombreCompleto}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Nombre de usuario</label>
          <input
            type="text"
            value={nombreUsuario}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarPerfilModal;
