const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const { authMiddleware, checkRole, checkOwnership } = require('../middleware/authMiddleware');
const { 
  validateUser, 
  validateUserUpdate, 
  validateMongoId, 
  validatePagination, 
  validateSearch 
} = require('../middleware/validate');

// Obtener todos los usuarios con paginación y búsqueda
router.get('/', validatePagination, validateSearch, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Construir query de búsqueda
    let query = {};
    
    if (req.query.search) {
      query.$or = [
        { nombre: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    if (req.query.rol) {
      query.rol = req.query.rol;
    }
    
    if (req.query.estado !== undefined) {
      query.estado = req.query.estado === 'true';
    }
    
    // Ejecutar consulta con paginación
    const usuarios = await Usuario.find(query)
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ fechaCreacion: -1 });
    
    // Contar total de documentos
    const total = await Usuario.countDocuments(query);
    
    // Calcular información de paginación
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    
    res.status(200).json({
      usuarios,
      paginacion: {
        pagina: page,
        limite: limit,
        total,
        totalPaginas: totalPages,
        tieneSiguiente: hasNextPage,
        tieneAnterior: hasPrevPage
      }
    });
    
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ 
      mensaje: 'Error al obtener usuarios', 
      error: error.message 
    });
  }
});

// Crear un nuevo usuario (solo admin)
router.post('/', authMiddleware, checkRole(['admin']), validateUser, async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    
    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findByEmail(email);
    if (usuarioExistente) {
      return res.status(409).json({ 
        mensaje: 'El email ya está registrado' 
      });
    }
    
    const nuevoUsuario = new Usuario({ 
      nombre, 
      email, 
      password, 
      rol: rol || 'usuario' 
    });
    
    await nuevoUsuario.save();
    
    // Enviar respuesta sin contraseña
    const usuarioPublico = nuevoUsuario.toPublicJSON();
    
    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      usuario: usuarioPublico
    });
    
  } catch (error) {
    console.error('Error creando usuario:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({ 
        mensaje: 'El email ya está registrado' 
      });
    }
    
    res.status(400).json({ 
      mensaje: 'Error al crear el usuario', 
      error: error.message 
    });
  }
});

// Obtener usuario por ID
router.get('/:id', validateMongoId, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-password');
    
    if (!usuario) {
      return res.status(404).json({ 
        mensaje: 'Usuario no encontrado' 
      });
    }
    
    res.status(200).json(usuario);
    
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(400).json({ 
      mensaje: 'Error al buscar usuario', 
      error: error.message 
    });
  }
});

// Actualizar usuario por ID
router.put('/:id', authMiddleware, checkOwnership, validateMongoId, validateUserUpdate, async (req, res) => {
  try {
    const { nombre, email, password, rol, estado } = req.body;
    
    // Verificar si el email ya existe (si se está actualizando)
    if (email) {
      const usuarioExistente = await Usuario.findOne({ 
        email, 
        _id: { $ne: req.params.id } 
      });
      if (usuarioExistente) {
        return res.status(409).json({ 
          mensaje: 'El email ya está registrado' 
        });
      }
    }
    
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, email, password, rol, estado },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!usuario) {
      return res.status(404).json({ 
        mensaje: 'Usuario no encontrado' 
      });
    }
    
    res.status(200).json({
      mensaje: 'Usuario actualizado exitosamente',
      usuario
    });
    
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({ 
        mensaje: 'El email ya está registrado' 
      });
    }
    
    res.status(400).json({ 
      mensaje: 'Error al actualizar usuario', 
      error: error.message 
    });
  }
});

// Eliminar usuario por ID (solo admin)
router.delete('/:id', authMiddleware, checkRole(['admin']), validateMongoId, async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({ 
        mensaje: 'Usuario no encontrado' 
      });
    }
    
    res.status(200).json({ 
      mensaje: 'Usuario eliminado correctamente' 
    });
    
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    res.status(400).json({ 
      mensaje: 'Error al eliminar usuario', 
      error: error.message 
    });
  }
});

// Obtener perfil del usuario autenticado
router.get('/perfil/me', authMiddleware, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.user.id).select('-password');
    
    if (!usuario) {
      return res.status(404).json({ 
        mensaje: 'Usuario no encontrado' 
      });
    }
    
    res.status(200).json(usuario);
    
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ 
      mensaje: 'Error al obtener perfil', 
      error: error.message 
    });
  }
});

// Actualizar perfil del usuario autenticado
router.put('/perfil/me', authMiddleware, validateUserUpdate, async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    
    // Verificar si el email ya existe (si se está actualizando)
    if (email) {
      const usuarioExistente = await Usuario.findOne({ 
        email, 
        _id: { $ne: req.user.id } 
      });
      if (usuarioExistente) {
        return res.status(409).json({ 
          mensaje: 'El email ya está registrado' 
        });
      }
    }
    
    const usuario = await Usuario.findByIdAndUpdate(
      req.user.id,
      { nombre, email, password },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.status(200).json({
      mensaje: 'Perfil actualizado exitosamente',
      usuario
    });
    
  } catch (error) {
    console.error('Error actualizando perfil:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({ 
        mensaje: 'El email ya está registrado' 
      });
    }
    
    res.status(400).json({ 
      mensaje: 'Error al actualizar perfil', 
      error: error.message 
    });
  }
});

module.exports = router;
