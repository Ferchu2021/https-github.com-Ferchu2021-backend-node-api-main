const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateProducto } = require('../middleware/validate');

// Endpoint OPTIONS específico para productos
router.options('*', (req, res) => {
  console.log('OPTIONS /api/producto - Preflight request');
  res.setHeader('Access-Control-Allow-Origin', 'https://frontend-techstore.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.status(200).end();
});

// Rutas públicas
router.get('/', productoController.obtenerProductos);
router.get('/buscar', productoController.buscarProductos);
router.get('/categoria/:categoria', productoController.obtenerProductosPorCategoria);
router.get('/:id', productoController.obtenerProductoPorId);

// Rutas privadas (requieren autenticación)
router.post('/', authMiddleware, validateProducto, productoController.crearProducto);
router.put('/:id', authMiddleware, validateProducto, productoController.actualizarProducto);
router.delete('/:id', authMiddleware, productoController.eliminarProducto);

// Ruta solo para administradores
router.delete('/:id/permanente', authMiddleware, productoController.eliminarProductoPermanente);

module.exports = router;