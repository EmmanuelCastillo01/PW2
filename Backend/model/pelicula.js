const mongoose = require("mongoose");

const peliculaschema = new mongoose.Schema({

    id: {
        type: Number,
        unique: true
      },
      nombre_pelicula: {
        type: String,
        required: [true, "Ingresa un titulo"]
    },
    sinopsis: {
      type: String,
        required: [true, "Agrege un pequeño resumen"]
    },
    imagen:{
        type: String,  
        required: [true, "Sube una imagen"]
    }
    
});

const pelicula = mongoose.model("pelicula",peliculaschema);

module.exports = pelicula;