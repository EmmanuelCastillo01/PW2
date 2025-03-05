const mongoose = require("mongoose");

const usuarioschema = new mongoose.Schema({

    id: {
        type: Number,
        unique: true
      },
      nombre_usuario: {
        type: String,
        required: [true, "Ingresa un nombre de usuario"]
    },
    contraseña:{
      type: String,
      required: [true, "Debe llenarse el campo de la contraseña"]
    },
    correo_electronico:{
      type: String,
      required: [true, "Ingrese una direccion de correa electronica"]
    },
    nombre_completo: {
      type: String,
        required: [true, "Ingrese su nombre"]
    }


});

const usuario = mongoose.model("usuario",usuarioschema);

module.exports = usuario;