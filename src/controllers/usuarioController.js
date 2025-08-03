const Usuario = require('../models/usuario');

// Obtener todos los usuarios con paginación y búsqueda
const getUsuarios = async (req, res) => {
  try {
    const { page = '1', limit = '10', search } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    // Construir query de búsqueda
    let query = {};
    
    if (search) {
      query.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Solo usuarios activos
    query.activo = true;
    
    // Ejecutar consulta con paginación
    const usuarios = await Usuario.find(query)
      .select('-contrasena')
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });
    
    // Contar total de documentos
    const total = await Usuario.countDocuments(query);
    
    // Calcular información de paginación
    const totalPages = Math.ceil(total / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;
    
    res.status(200).json({
      success: true,
      usuarios,
      paginacion: {
        pagina: pageNum,
        limite: limitNum,
        total,
        totalPaginas: totalPages,
        tieneSiguiente: hasNextPage,
        tieneAnterior: hasPrevPage
      }
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
    
    const nuevoUsuario = new Usuario({ 
      nombre, 
      email, 
      contrasena, 
      productos: productos || '',
      activo: true
    });
    
    await nuevoUsuario.save();
    
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
    
    if (error.code === 11000) {
      res.status(409).json({ 
        success: false,
        mensaje: 'El email ya está registrado' 
      });
      return;
    }
    
    res.status(400).json({ 
      success: false,
      mensaje: 'Error al crear el usuario', 
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

// Actualizar usuario por ID
const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, contrasena, productos, activo } = req.body;
    
    // Verificar si el email ya existe (si se está actualizando)
    if (email) {
      const usuarioExistente = await Usuario.findOne({ 
        email, 
        _id: { $ne: id } 
      });
      
      if (usuarioExistente) {
        res.status(409).json({ 
          success: false,
          mensaje: 'El email ya está registrado por otro usuario' 
        });
        return;
      }
    }
    
    // Preparar datos de actualización
    const updateData = {};
    if (nombre) updateData.nombre = nombre;
    if (email) updateData.email = email;
    if (contrasena) updateData.contrasena = contrasena;
    if (productos !== undefined) updateData.productos = productos;
    if (activo !== undefined) updateData.activo = activo;
    
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-contrasena');
    
    if (!usuarioActualizado) {
      res.status(404).json({ 
        success: false,
        mensaje: 'Usuario no encontrado' 
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      mensaje: 'Usuario actualizado exitosamente',
      usuario: usuarioActualizado
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

// Eliminar usuario por ID (soft delete)
const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    
    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { 
        activo: false
      },
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

// Buscar usuarios por criterios
const buscarUsuarios = async (req, res) => {
  try {
    const { q, limit = '10' } = req.query;
    const limitNum = parseInt(limit);
    
    let query = {};
    
    // Búsqueda por texto
    if (q) {
      query.$or = [
        { nombre: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { productos: { $regex: q, $options: 'i' } }
      ];
    }
    
    // Solo usuarios activos
    query.activo = true;
    
    const usuarios = await Usuario.find(query)
      .select('-contrasena')
      .limit(limitNum)
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      usuarios,
      total: usuarios.length
    });
    
  } catch (error) {
    console.error('Error buscando usuarios:', error);
    res.status(500).json({ 
      success: false,
      mensaje: 'Error al buscar usuarios', 
      error: error.message 
    });
  }
};

// Obtener estadísticas de usuarios
const getEstadisticasUsuarios = async (req, res) => {
  try {
    const totalUsuarios = await Usuario.countDocuments({ activo: true });
    
    res.status(200).json({
      success: true,
      estadisticas: {
        total: totalUsuarios
      }
    });
    
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({ 
      success: false,
      mensaje: 'Error al obtener estadísticas', 
      error: error.message 
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
  getUsuarioById,
  actualizarUsuario,
  eliminarUsuario,
  buscarUsuarios,
  getEstadisticasUsuarios
}; 