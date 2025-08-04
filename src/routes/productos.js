const express = require('express');
const router = express.Router();

// Endpoint OPTIONS específico para productos
router.options('/', (req, res) => {
  console.log('OPTIONS /api/producto - Preflight request');
  res.setHeader('Access-Control-Allow-Origin', 'https://frontend-techstore.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.status(200).end();
});

// Obtener todos los productos
router.get('/', (req, res) => {
  try {
    console.log('GET /api/producto - Endpoint llamado');
    
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
    console.log('POST /api/producto - Endpoint llamado');
    console.log('Body recibido:', req.body);
    
    // Headers CORS específicos para este endpoint
    res.setHeader('Access-Control-Allow-Origin', 'https://frontend-techstore.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
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