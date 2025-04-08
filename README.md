# PW2
Repositorio para programacion web 2

Nombres de los integrantes 
Tania Berenice Rodriguez Guerrero 2007809


Descripcion de la aplicacion
ReviewXpert es una aplicación web desarrollada con una arquitectura de frontend y backend separadas. Su objetivo principal es permitir a los usuarios registrarse, iniciar sesión, explorar películas, ver detalles individuales y dejar valoraciones personales.

El sistema está construido en JavaScript y TypeScript, usando un stack típico de desarrollo web moderno que incluye Node.js para el backend y React con TypeScript para el frontend.

📁 Estructura de Carpetas
Backend/
Contiene todos los archivos relacionados con el servidor, API y lógica del lado del backend. Incluye:

controller/:
Contiene los controladores encargados de manejar la lógica de negocio y las operaciones que se realizan sobre los modelos. Ej: usuario.js, pelicula.js, etc.

model/:
Modelos de datos que representan las entidades de la base de datos como usuario, pelicula y comentario.

routes/:
Define las rutas de la API que responden a solicitudes del frontend. Cada archivo representa un conjunto de endpoints (por entidad).

index.js:
Archivo principal que inicializa el servidor y configura el backend.

FrontEnd/
Contiene todos los archivos relacionados con el cliente (frontend), hechos con React y TypeScript.

public/imagenes/:
Carpeta con imágenes utilizadas en la interfaz, como imágenes por defecto o recursos visuales.

src/: Contiene el núcleo del frontend, dividido en varias carpetas según la funcionalidad:

actions/:
Archivos que definen acciones o funciones reutilizables (ej. Actions.ts), probablemente para manejar estados globales o interacciones.

components/:
Componentes visuales reutilizables como:

Login.tsx: pantalla de inicio de sesión.

RegisterModal.tsx: modal para registrarse.

Main.tsx: página principal.

PeliculaCard.tsx: tarjeta individual de película.

services/:
Funciones para realizar llamadas al backend. userServices.ts probablemente gestiona el login, registro y otras acciones del usuario.

types/:
Tipos personalizados de TypeScript para mantener consistencia de datos.

App.tsx:
Componente raíz de la aplicación.

globaStorage.ts:
Probablemente se usa para manejar un estado global o almacenamiento local.

index.tsx:
Punto de entrada principal de la app React (montaje en el DOM).

index.css:
Estilos globales.

index.html:
Plantilla HTML que sirve como base para inyectar la aplicación React.

Otros archivos importantes
package.json / package-lock.json:

Archivos de configuración que definen las dependencias del proyecto.

.eslintrc.js:
Reglas de estilo y linting para mantener el código limpio.

postcss.config.js:
Configuración para procesar los estilos con PostCSS.

node_modules/:
Carpeta que contiene todas las dependencias instaladas del proyecto (se genera automáticamente con npm).
