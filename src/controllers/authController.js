const Usuario = require("../models/usuario");
const jwt = require("jsonwebtoken");

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const usuario = await Usuario.findByEmail(email);
    if (!usuario) {
      return res.status(401).json({ 
        error: "Credenciales inválidas" 
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.estado) {
      return res.status(401).json({ 
        error: "Cuenta deshabilitada" 
      });
    }

    // Comparar contraseñas
    const passwordValida = await usuario.comparePassword(password);
    if (!passwordValida) {
      return res.status(401).json({ 
        error: "Credenciales inválidas" 
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      { 
        id: usuario._id, 
        email: usuario.email, 
        rol: usuario.rol 
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Enviar respuesta sin contraseña
    const usuarioPublico = usuario.toPublicJSON();
    
    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: usuarioPublico
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      error: "Error interno del servidor" 
    });
  }
};

// REGISTER
exports.register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findByEmail(email);
    if (usuarioExistente) {
      return res.status(409).json({ 
        error: "El email ya está registrado" 
      });
    }

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password,
      rol: rol || 'usuario' // Por defecto es usuario
    });

    await nuevoUsuario.save();

    // Generar token JWT
    const token = jwt.sign(
      { 
        id: nuevoUsuario._id, 
        email: nuevoUsuario.email, 
        rol: nuevoUsuario.rol 
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Enviar respuesta sin contraseña
    const usuarioPublico = nuevoUsuario.toPublicJSON();

    res.status(201).json({
      mensaje: "Usuario registrado exitosamente",
      token,
      usuario: usuarioPublico
    });

  } catch (error) {
    console.error('Error en registro:', error);
    
    // Manejar errores de validación de MongoDB
    if (error.code === 11000) {
      return res.status(409).json({ 
        error: "El email ya está registrado" 
      });
    }
    
    res.status(500).json({ 
      error: "Error interno del servidor" 
    });
  }
};

// VERIFY TOKEN
exports.verifyToken = async (req, res) => {
  try {
    // El middleware de autenticación ya verificó el token
    // Solo necesitamos devolver la información del usuario
    const usuario = await Usuario.findById(req.user.id).select('-password');
    
    if (!usuario) {
      return res.status(404).json({ 
        error: "Usuario no encontrado" 
      });
    }

    res.json({
      mensaje: "Token válido",
      usuario
    });

  } catch (error) {
    console.error('Error verificando token:', error);
    res.status(500).json({ 
      error: "Error interno del servidor" 
    });
  }
};

// REFRESH TOKEN
exports.refreshToken = async (req, res) => {
  try {
    // Verificar que el usuario existe
    const usuario = await Usuario.findById(req.user.id);
    if (!usuario || !usuario.estado) {
      return res.status(401).json({ 
        error: "Usuario no válido" 
      });
    }

    // Generar nuevo token
    const newToken = jwt.sign(
      { 
        id: usuario._id, 
        email: usuario.email, 
        rol: usuario.rol 
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      mensaje: "Token renovado",
      token: newToken
    });

  } catch (error) {
    console.error('Error renovando token:', error);
    res.status(500).json({ 
      error: "Error interno del servidor" 
    });
  }
};
