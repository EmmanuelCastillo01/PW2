const express = require('express');
const router = express.Router();
const { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario,validarUsuario } = require('../controller/usuario');

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.send('Usuarios home page');
});

router.route('/usuario')
  .get(getUsuarios)  // Obtener todos los usuarios
  .post(createUsuario);  // Crear un nuevo usuario

router.route('/usuario/:id')
  .get(getUsuario)  // Obtener un usuario por ID
  .patch(updateUsuario)  // Actualizar un usuario por ID
  .delete(deleteUsuario);  // Eliminar un usuario por ID

router.route('/usuario/validar')
  .post(validarUsuario);  // Validar un usuario por correo y contraseña

module.exports = router;
