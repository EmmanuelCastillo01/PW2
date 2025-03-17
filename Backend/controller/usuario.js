const Usuario = require('../model/usuario.js'); 

// @desc    Obtener todos los usuarios
// @route   GET /api/v1/usuarios
// @access  Público
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({});
    res.status(200).json({ success: true, count: usuarios.length, data: usuarios });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al obtener usuarios", error });
  }
};

exports.validarUsuario = async (req, res) => {
  try {
    const usuarioExistente = await Usuario.findOne({ correo_electronico: req.body.correo_electronico, contraseña: req.body.contraseña });
    if (!usuarioExistente)  {
      return res.status(404).json({ success: false, message: `Usuario con correo o contrasena ${req.body.correo_electronico} no encontrado` });
    }
    res.status(200).json({ success: true, data: usuarioExistente });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al obtener el usuario", error });
  }
};


// @desc    Obtener un usuario por ID
// @route   GET /api/v1/usuarios/:id
// @access  Público.
exports.getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ success: false, message: `Usuario con ID ${req.params.id} no encontrado` });
    }
    res.status(200).json({ success: true, data: usuario });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al obtener el usuario", error });
  }
};

// @desc    Crear un nuevo usuario
// @route   POST /api/v1/usuarios
// @access  Público
exports.createUsuario = async (req, res) => {
  try {

    const usuarioExistente = await Usuario.findOne({ correo_electronico: req.body.correo_electronico });
    if (!usuarioExistente) {
    const usuario = await Usuario.create(req.body);
    res.status(201).json({ success: true, data: usuario, message: 'Usuario creado correctamente' });
    }
    else {
      res.status(400).json({ success: false, message: "Usuario ya existe" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Error al crear usuario", error });
  }
};

// @desc    Actualizar un usuario
// @route   PATCH /api/v1/usuarios/:id
// @access  Público
exports.updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!usuario) {
      return res.status(404).json({ success: false, message: `Usuario con ID ${req.params.id} no encontrado` });
    }
    res.json({ success: true, message: 'Usuario actualizado correctamente', data: usuario });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al actualizar usuario", error });
  }
};

// @desc    Eliminar un usuario
// @route   DELETE /api/v1/usuarios/:id
// @access  Público
exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ success: false, message: `Usuario con ID ${req.params.id} no encontrado` });
    }
    res.json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al eliminar usuario", error });
  }
};
