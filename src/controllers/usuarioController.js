// controllers/usuarioController.js

const Usuario = require('../models/usuario'); // Asegúrate que la ruta es correcta

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: err.message });
  }
};

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ mensaje: 'Error al crear usuario', error: err.message });
  }
};

// Obtener usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener usuario', error: err.message });
  }
};

// Actualizar usuario por ID
exports.updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.status(200).json(usuario);
  } catch (err) {
    res.status(400).json({ mensaje: 'Error al actualizar usuario', error: err.message });
  }
};

// Eliminar usuario por ID
exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error: err.message });
  }
};
