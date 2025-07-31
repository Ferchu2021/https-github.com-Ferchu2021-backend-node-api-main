const jwt = require('jsonwebtoken');

// Middleware para verificar token JWT
const authMiddleware = (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'Acceso denegado. Token no proporcionado.' 
      });
    }

    // Verificar formato del token
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ 
        error: 'Formato de token inválido.' 
      });
    }

    // Verificar token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expirado.' 
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Token inválido.' 
      });
    }
    res.status(500).json({ 
      error: 'Error interno del servidor.' 
    });
  }
};

// Middleware para verificar roles
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Usuario no autenticado.' 
      });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ 
        error: 'No tienes permisos para realizar esta acción.' 
      });
    }

    next();
  };
};

// Middleware para verificar si es el propietario o admin
const checkOwnership = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Usuario no autenticado.' 
    });
  }

  // Si es admin, puede acceder a todo
  if (req.user.rol === 'admin') {
    return next();
  }

  // Si no es admin, solo puede acceder a sus propios datos
  if (req.user.id !== req.params.id) {
    return res.status(403).json({ 
      error: 'Solo puedes acceder a tus propios datos.' 
    });
  }

  next();
};

module.exports = {
  authMiddleware,
  checkRole,
  checkOwnership
};

