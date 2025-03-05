const mongoose = require("mongoose");

const usuarioschema = new mongoose.Schema({

    id: {
        type: Number,
        unique: true
      },
      nombre: {
        type: String,
        required: [true, "Debe ser el nombre de usuario"]
    } 

});

const usuario = mongoose.model("",usuarioschema);

module.exports = usuario;