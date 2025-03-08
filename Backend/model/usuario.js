const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    nombre_usuario: {
        type: String,
        required: [true, "Ingresa un nombre de usuario"]
    },
    contraseña: {
        type: String,
        required: [true, "Debe llenarse el campo de la contraseña"]
    },
    correo_electronico: {
        type: String,
        required: [true, "Ingrese una dirección de correo electrónico"],
        unique: true,
        match: [/.+\@.+\..+/, "Ingrese un correo electrónico válido"]
    },
    nombre_completo: {
        type: String,
        required: [true, "Ingrese su nombre"]
    },
    tipo_usuario: {
        type: String,
        enum: ["usuario", "empleado"], // Solo permite estos dos valores
        required: true,
        default: "usuario"
    }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
