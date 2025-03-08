/*const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mi_base_de_datos', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB conectado correctamente');
    } catch (error) {
        console.error('❌ Error de conexión a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = conectarDB;

*/
const mongoose = require('mongoose'); //CODIGO DEL PROFE

const uri = 'direccion';
const express = require('express'); const app = express(); const port = 8080;
const bodyParser = require('body-parser');
// support parsing of application/json type post data
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.use(bodyParser.json());
    //support parsing of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    const users = require('./routers/usuario')
    app.use('/users', users)
    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
      })
  .catch(error => {
    console.error('Connection fail', error);
  });

/*const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Importar rutas desde la carpeta "views"
const usuarioRoutes = require('./routes/usuario');
const peliculaRoutes = require('./routes/pelicula');
const comentarioRoutes = require('./routes/comentario');

// Usar rutas
app.use('/api/v1', usuarioRoutes);
app.use('/api/v1', peliculaRoutes);
app.use('/api/v1', comentarioRoutes);

// Puerto y escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});*/
