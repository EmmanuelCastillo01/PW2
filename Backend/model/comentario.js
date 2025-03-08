const mongoose = require("mongoose");

const comentarioSchema = new mongoose.Schema({
    pelicula_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pelicula",
        required: true
    },
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    nombre_usuario: {
        type: String,
        required: true
    },
    comentario: {
        type: String,
        required: [true, "Debe ingresar un comentario"],
        maxlength: [500, "El comentario no puede superar los 500 caracteres"]
    },
    calificacion: {
        type: Number,
        required: true,
        min: 1,
        max: 5 // La calificación es de 1 a 5 estrellas
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

const Comentario = mongoose.model("Comentario", comentarioSchema);

module.exports = Comentario;
