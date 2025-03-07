const Pelicula = require("../models/pelicula");

// Obtener todas las películas
exports.getPeliculas = async (req, res) => {
    try {
        const peliculas = await Pelicula.find({});
        res.status(200).json({ success: true, count: peliculas.length, data: peliculas });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener las películas", error });
    }
};

// Obtener una película por ID
exports.getPelicula = async (req, res) => {
    try {
        const pelicula = await Pelicula.findById(req.params.id);
        if (!pelicula) {
            return res.status(404).json({ success: false, message: `Película con ID ${req.params.id} no encontrada` });
        }
        res.status(200).json({ success: true, data: pelicula });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener la película", error });
    }
};

// Crear una nueva película.
exports.createPelicula = async (req, res) => {
    try {
        const pelicula = await Pelicula.create(req.body);
        res.status(201).json({ success: true, data: pelicula, message: 'Película creada correctamente' });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error al crear la película", error });
    }
};

// Actualizar una película
exports.updatePelicula = async (req, res) => {
    try {
        const pelicula = await Pelicula.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!pelicula) {
            return res.status(404).json({ success: false, message: `Película con ID ${req.params.id} no encontrada` });
        }
        res.json({ success: true, message: 'Película actualizada correctamente', data: pelicula });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al actualizar la película", error });
    }
};

// Eliminar una película
exports.deletePelicula = async (req, res) => {
    try {
        const pelicula = await Pelicula.findByIdAndDelete(req.params.id);
        if (!pelicula) {
            return res.status(404).json({ success: false, message: `Película con ID ${req.params.id} no encontrada` });
        }
        res.json({ success: true, message: 'Película eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al eliminar la película", error });
    }
};
