import React from 'react';

interface PeliculaCardProps {
  data: Pelicula;
  /** Clases de Tailwind para el ancho (ej. 'w-40', 'w-full', etc.). Default: w-full */
  widthClass?: string;
  /** Clases de Tailwind para la altura (ej. 'h-40', 'h-64', etc.). Default: h-40 */
  heightClass?: string;
}

const defaultImage = '/imagenes/imagennodisponible.png';

// Función para validar si una cadena es una URL válida
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const PeliculaCard: React.FC<PeliculaCardProps> = ({
  data,
  widthClass = 'w-full',
  heightClass = 'h-44',
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (e.currentTarget.src !== defaultImage) {
      e.currentTarget.src = defaultImage;
    }
  };

  // Validar si el campo imagen es una URL válida, si no, usar la imagen predeterminada
  const imageUrl = isValidUrl(data.imagen) ? data.imagen : defaultImage;

  return (
    <div
      className={`relative overflow-hidden rounded-md ${widthClass} ${heightClass} transform transition-transform duration-300 hover:scale-105 hover:shadow-lg`}
    >
      <img
        src={imageUrl}
        alt={data.titulo}
        onError={handleImageError}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-lg font-bold">
        {data.titulo}
      </div>
    </div>
  );
};

export default PeliculaCard;