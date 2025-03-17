const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const Usuario = require('./Backend/model/usuario'); 
const Pelicula = require('./Backend/model/pelicula');
const Comentario = require('./Backend/model/comentario');
const users = require('./Backend/routes/usuario');

const app = express();
const port = 8080;

// Conectar a MongoDB
const conectarDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/PrograWeb2', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB conectado correctamente');
    } catch (error) {
        console.error('❌ Error de conexión a MongoDB:', error);
        process.exit(1);
    }
};

// Llamar a la función para conectar a la base de datos
conectarDB().then(async () => {
    
    /*const usuarioExistente = await Usuario.findOne({ correo_electronico: 'admin@example.com' });
    if (!usuarioExistente) {
        const usuarioAdmin = new Usuario({
            nombre_usuario: 'Admin',
            correo_electronico: 'admin@example.com',
            contraseña: 'admin123',
            nombre_completo: 'Administrador',
            tipo_usuario: 'empleado'
        });
        await usuarioAdmin.save();
        console.log('Usuario admin creado');
    } else {
        console.log('Usuario admin ya existe');
    }*/

    // Middleware para parsear JSON y URL-encoded
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use('/users', users);

    // Iniciar el servidor
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Connection fail', error);
});