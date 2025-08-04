const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

// Login de usuario
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
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
    const contrasenaValida = await usuario.comparePassword(password);
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

// Registro de usuario
const register = async (req, res) => {
  try {
    const { nombre, email, password, productos } = req.body;
    
    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      res.status(409).json({ 
        success: false,
        mensaje: 'El email ya está registrado' 
      });
      return;
    }
    
    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({ 
      nombre, 
      email, 
      contrasena: password, 
      productos: productos || '',
      activo: true
    });
    
    await nuevoUsuario.save();
    
    // Generar JWT
    const token = jwt.sign(
      { 
        userId: nuevoUsuario._id, 
        email: nuevoUsuario.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      success: true,
      mensaje: 'Usuario registrado exitosamente',
      token,
      usuario: {
        _id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        productos: nuevoUsuario.productos,
        activo: nuevoUsuario.activo
      }
    });
    
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(400).json({ 
      success: false,
      mensaje: 'Error al registrar usuario', 
      error: error.message
    });
  }
};

// Verificar token
const verifyToken = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      mensaje: 'Token válido',
      user: req.user
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      mensaje: 'Token inválido'
    });
  }
};

// Refresh token
const refreshToken = async (req, res) => {
  try {
    const token = jwt.sign(
      { 
        userId: req.user.userId, 
        email: req.user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(200).json({
      success: true,
      mensaje: 'Token renovado',
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al renovar token'
    });
  }
};

module.exports = {
  login,
  register,
  verifyToken,
  refreshToken
};
