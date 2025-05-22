const Comentario = require("../model/comentario");

// Obtener todos los comentarios
exports.getComentarios = async (req, res) => {
    try {
        const comentarios = await Comentario.find({}).populate("usuario_id", "nombre_usuario").populate("pelicula_id", "titulo");
        res.status(200).json({ success: true, count: comentarios.length, data: comentarios });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener comentarios", error });
    }
};

// Obtener comentarios por película ID.
// controller/comentario.js
exports.getComentariosPorPelicula = async (req, res) => {
  try {
    /*  👇  usa el nombre REAL del campo  */
    const comentarios = await Comentario
      .find({ pelicula_id: req.params.id })   // ← era { pelicula: ... }
      .sort({ fecha: -1 })                    // más recientes primero
      .populate('usuario_id', 'nombre_usuario');

    res.status(200).json({ success: true, count: comentarios.length, data: comentarios });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener comentarios', error });
  }
};


// Crear un comentario
exports.createComentario = async (req, res) => {
    try {
        const comentario = await Comentario.create(req.body);
        res.status(201).json({ success: true, data: comentario, message: 'Comentario creado correctamente' });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error al crear comentario", error });
    }
};

// Eliminar un comentario
exports.deleteComentario = async (req, res) => {
    try {
        const comentario = await Comentario.findByIdAndDelete(req.params.id);
        if (!comentario) {
            return res.status(404).json({ success: false, message: `Comentario con ID ${req.params.id} no encontrado` });
        }
        res.json({ success: true, message: 'Comentario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al eliminar el comentario", error });
    }
};
