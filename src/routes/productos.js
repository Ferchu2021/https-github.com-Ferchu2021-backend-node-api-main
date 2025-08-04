const express = require('express');
const router = express.Router();

// Obtener todos los productos
router.get('/', (req, res) => {
  try {
    console.log('GET /api/products - Endpoint llamado');
    
    res.status(200).json({
      success: true,
      mensaje: 'Lista de productos',
      timestamp: new Date().toISOString(),
      productos: [
        {
          id: 1,
          nombre: 'Laptop Gaming Pro',
          precio: 1299.99,
          descripcion: 'Laptop de alto rendimiento para gaming',
          categoria: 'Laptops',
          stock: 15
        },
        {
          id: 2,
          nombre: 'Monitor 4K Ultra HD',
          precio: 599.99,
          descripcion: 'Monitor de 27" con resolución 4K',
          categoria: 'Monitores',
          stock: 8
        }
      ]
    });
  } catch (error) {
    console.error('Error en GET /api/products:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener productos',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Crear un nuevo producto
router.post('/', (req, res) => {
  try {
    const { nombre, precio, descripcion, categoria, stock } = req.body;
    
    res.status(201).json({
      success: true,
      mensaje: 'Producto creado exitosamente',
      producto: {
        id: Date.now(),
        nombre,
        precio,
        descripcion,
        categoria,
        stock
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      mensaje: 'Error al crear producto',
      error: error.message
    });
  }
});

module.exports = router;