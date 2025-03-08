const express = require('express');
const router = express.Router();
const { getPeliculas, getPelicula, createPelicula, updatePelicula, deletePelicula } = require('../controller/pelicula');

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.send('Película home page');
});

router.route('/pelicula')
  .get(getPeliculas)  // Obtener todas las películas
  .post(createPelicula);  // Crear una nueva película

router.route('/pelicula/:id')
  .get(getPelicula)  // Obtener una película por ID
  .patch(updatePelicula)  // Actualizar una película por ID
  .delete(deletePelicula);  // Eliminar una película por ID

module.exports = router;
