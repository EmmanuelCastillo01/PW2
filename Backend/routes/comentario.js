const express = require('express');
const router = express.Router();
const { getComentarios, getComentariosPorPelicula, createComentario, deleteComentario,getComentariosPorUsuario } = require('../controller/comentario');

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.send('Comentarios home page');
});

router.route('/comentarios')
  .get(getComentarios)  // Obtener todos los comentarios
  .post(createComentario);  // Crear un nuevo comentario

router.route('/comentarios/pelicula/:id')
  .get(getComentariosPorPelicula);  // Obtener comentarios de una película específica

  router.route('/comentarios/usuario/:id')
  .get(getComentariosPorUsuario);           // ← nueva ruta

router.route('/comentarios/:id')
  .delete(deleteComentario);  // Eliminar un comentario por ID





module.exports = router;
