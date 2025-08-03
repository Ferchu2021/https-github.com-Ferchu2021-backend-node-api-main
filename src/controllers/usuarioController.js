const Usuario = require('../models/usuario');
const { adminAuth, adminDb } = require('../config/firebase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, contrasena, productos } = req.body;
    
    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      res.status(409).json({ 
        success: false,
        mensaje: 'El email ya está registrado' 
      });
      return;
    }
    
    // Crear usuario en MongoDB
    const nuevoUsuario = new Usuario({ 
      nombre, 
      email, 
      contrasena, 
      productos: productos || '',
      activo: true
    });
    
    await nuevoUsuario.save();
    
    // Crear usuario en Firebase
    try {
      const firebaseUser = await adminAuth.createUser({
        email: email,
        password: contrasena,
        displayName: nombre
      });
      
      // Guardar en Firestore
      await adminDb.collection('usuarios').doc(firebaseUser.uid).set({
        nombre: nombre,
        email: email,
        productos: productos || '',
        mongoId: nuevoUsuario._id.toString()
      });
      
    } catch (firebaseError) {
      console.error('Error en Firebase:', firebaseError);
      // Si falla Firebase, seguimos con MongoDB
    }
    
    // Enviar respuesta sin contraseña
    const usuarioResponse = {
      _id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      productos: nuevoUsuario.productos,
      activo: nuevoUsuario.activo,
      createdAt: nuevoUsuario.createdAt,
      updatedAt: nuevoUsuario.updatedAt
    };
    
    res.status(201).json({
      success: true,
      mensaje: 'Usuario creado exitosamente',
      usuario: usuarioResponse
    });
    
  } catch (error) {
    console.error('Error creando usuario:', error);
    res.status(400).json({ 
      success: false,
      mensaje: 'Error al crear el usuario', 
      error: error.message
    });
  }
};

// Obtener todos los usuarios (público)
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({ activo: true }).select('-contrasena');
    
    res.status(200).json({
      success: true,
      usuarios
    });
    
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ 
      success: false,
      mensaje: 'Error al obtener usuarios', 
      error: error.message
    });
  }
};

// Obtener usuario por ID
const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const usuario = await Usuario.findById(id).select('-contrasena');
    
    if (!usuario) {
      res.status(404).json({ 
        success: false,
        mensaje: 'Usuario no encontrado' 
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      usuario
    });
    
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(400).json({ 
      success: false,
      mensaje: 'Error al buscar usuario', 
      error: error.message
    });
  }
};

// Actualizar usuario
const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, productos, activo } = req.body;
    
    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { nombre, email, productos, activo },
      { new: true }
    ).select('-contrasena');
    
    if (!usuario) {
      res.status(404).json({ 
        success: false,
        mensaje: 'Usuario no encontrado' 
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      mensaje: 'Usuario actualizado exitosamente',
      usuario
    });
    
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    res.status(400).json({ 
      success: false,
      mensaje: 'Error al actualizar usuario', 
      error: error.message
    });
  }
};

// Eliminar usuario (baja lógica)
const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    
    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true }
    ).select('-contrasena');
    
    if (!usuario) {
      res.status(404).json({ 
        success: false,
        mensaje: 'Usuario no encontrado' 
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      mensaje: 'Usuario eliminado exitosamente',
      usuario
    });
    
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    res.status(400).json({ 
      success: false,
      mensaje: 'Error al eliminar usuario', 
      error: error.message
    });
  }
};

// Login de usuario
const loginUsuario = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    
    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      res.status(401).json({ 
        success: false,
        mensaje: 'Credenciales inválidas' 
      });
      return;
    }
    
    // Verificar contraseña
    const contrasenaValida = await usuario.comparePassword(contrasena);
    if (!contrasenaValida) {
      res.status(401).json({ 
        success: false,
        mensaje: 'Credenciales inválidas' 
      });
      return;
    }
    
    // Generar JWT
    const token = jwt.sign(
      { 
        userId: usuario._id, 
        email: usuario.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(200).json({
      success: true,
      mensaje: 'Login exitoso',
      token,
      usuario: {
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        productos: usuario.productos,
        activo: usuario.activo
      }
    });
    
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      success: false,
      mensaje: 'Error en el servidor', 
      error: error.message
    });
  }
};

module.exports = {
  crearUsuario,
  getUsuarios,
  getUsuarioById,
  actualizarUsuario,
  eliminarUsuario,
  loginUsuario
};