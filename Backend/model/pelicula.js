// model/pelicula.js
const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'Debe ingresar un título para la película'],
    },
    sinopsis: {
      type: String,
      required: [true, 'Debe ingresar una sinopsis'],
    },
    imagen: {
      type: String,
      required: [true, 'Debe agregar una imagen'],
    },
    calificacion_promedio: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }          // 👈  createdAt y updatedAt automáticos
);

module.exports = mongoose.model('Pelicula', peliculaSchema);
