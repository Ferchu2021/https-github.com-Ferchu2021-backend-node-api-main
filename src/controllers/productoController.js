const Producto = require('../models/producto');

// Obtener todos los productos (público)
const obtenerProductos = async (req, res) => {
  try {
    console.log('GET /api/producto - Endpoint llamado');
    
    const productos = await Producto.findActive().populate('creadoPor', 'nombre email');
    
    res.status(200).json({
      success: true,
      mensaje: 'Lista de productos obtenida exitosamente',
      timestamp: new Date().toISOString(),
      productos: productos
    });
  } catch (error) {
    console.error('Error en obtenerProductos:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener productos',
      error: error.message
    });
  }
};

// Obtener producto por ID (público)
const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    
    const producto = await Producto.findOne({ _id: id, activo: true })
      .populate('creadoPor', 'nombre email');
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        mensaje: 'Producto no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      producto: producto
    });
  } catch (error) {
    console.error('Error en obtenerProductoPorId:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener producto',
      error: error.message
    });
  }
};

// Crear nuevo producto (privado - requiere autenticación)
const crearProducto = async (req, res) => {
  try {
    console.log('POST /api/producto - Endpoint llamado');
    console.log('Body recibido:', req.body);
    
    const { nombre, precio, descripcion, categoria, stock, imagen } = req.body;
    
    // Crear nuevo producto
    const nuevoProducto = new Producto({
      nombre,
      precio,
      descripcion,
      categoria,
      stock: stock || 0,
      imagen: imagen || '',
      creadoPor: req.user.userId // ID del usuario autenticado
    });
    
    await nuevoProducto.save();
    
    // Poblar información del creador
    await nuevoProducto.populate('creadoPor', 'nombre email');
    
    res.status(201).json({
      success: true,
      mensaje: 'Producto creado exitosamente',
      producto: nuevoProducto
    });
  } catch (error) {
    console.error('Error en crearProducto:', error);
    res.status(400).json({
      success: false,
      mensaje: 'Error al crear producto',
      error: error.message
    });
  }
};

// Actualizar producto (privado - requiere autenticación)
const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, descripcion, categoria, stock, imagen } = req.body;
    
    // Buscar producto
    const producto = await Producto.findById(id);
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        mensaje: 'Producto no encontrado'
      });
    }
    
    // Verificar que el usuario sea el creador o admin
    if (producto.creadoPor.toString() !== req.user.userId && req.user.rol !== 'admin') {
      return res.status(403).json({
        success: false,
        mensaje: 'No tienes permisos para modificar este producto'
      });
    }
    
    // Actualizar campos
    if (nombre) producto.nombre = nombre;
    if (precio !== undefined) producto.precio = precio;
    if (descripcion) producto.descripcion = descripcion;
    if (categoria) producto.categoria = categoria;
    if (stock !== undefined) producto.stock = stock;
    if (imagen !== undefined) producto.imagen = imagen;
    
    await producto.save();
    await producto.populate('creadoPor', 'nombre email');
    
    res.status(200).json({
      success: true,
      mensaje: 'Producto actualizado exitosamente',
      producto: producto
    });
  } catch (error) {
    console.error('Error en actualizarProducto:', error);
    res.status(400).json({
      success: false,
      mensaje: 'Error al actualizar producto',
      error: error.message
    });
  }
};

// Eliminar producto (baja lógica - privado)
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    
    const producto = await Producto.findById(id);
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        mensaje: 'Producto no encontrado'
      });
    }
    
    // Verificar permisos
    if (producto.creadoPor.toString() !== req.user.userId && req.user.rol !== 'admin') {
      return res.status(403).json({
        success: false,
        mensaje: 'No tienes permisos para eliminar este producto'
      });
    }
    
    // Baja lógica
    await producto.deactivate();
    
    res.status(200).json({
      success: true,
      mensaje: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error en eliminarProducto:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al eliminar producto',
      error: error.message
    });
  }
};

// Eliminar producto permanentemente (baja física - solo admin)
const eliminarProductoPermanente = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar que sea admin
    if (req.user.rol !== 'admin') {
      return res.status(403).json({
        success: false,
        mensaje: 'Solo los administradores pueden eliminar permanentemente'
      });
    }
    
    const producto = await Producto.findByIdAndDelete(id);
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        mensaje: 'Producto no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      mensaje: 'Producto eliminado permanentemente'
    });
  } catch (error) {
    console.error('Error en eliminarProductoPermanente:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al eliminar producto',
      error: error.message
    });
  }
};

// Buscar productos por texto
const buscarProductos = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        mensaje: 'Término de búsqueda requerido'
      });
    }
    
    const productos = await Producto.search(q).populate('creadoPor', 'nombre email');
    
    res.status(200).json({
      success: true,
      mensaje: 'Búsqueda completada',
      productos: productos,
      termino: q
    });
  } catch (error) {
    console.error('Error en buscarProductos:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error en la búsqueda',
      error: error.message
    });
  }
};

// Obtener productos por categoría
const obtenerProductosPorCategoria = async (req, res) => {
  try {
    const { categoria } = req.params;
    
    const productos = await Producto.findByCategory(categoria)
      .populate('creadoPor', 'nombre email');
    
    res.status(200).json({
      success: true,
      mensaje: `Productos de categoría: ${categoria}`,
      categoria: categoria,
      productos: productos
    });
  } catch (error) {
    console.error('Error en obtenerProductosPorCategoria:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener productos por categoría',
      error: error.message
    });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  eliminarProductoPermanente,
  buscarProductos,
  obtenerProductosPorCategoria
}; 