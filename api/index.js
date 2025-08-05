// Configurar variables de entorno para Vercel
require('dotenv').config();

// Exportar la aplicación principal con MongoDB
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// CORS configurado para Vercel
app.use(cors({
  origin: [
    'https://frontend-techstore.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Conectar a MongoDB
const connectDB = async () => {
  try {
    console.log('🔌 Conectando a MongoDB...');
    console.log('MongoDB URI:', process.env.MONGO_URI ? 'Configurado' : 'No configurado');
    
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI no está configurado');
    }
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB conectado exitosamente');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    throw error;
  }
};

// Inicializar conexión a MongoDB
connectDB().catch(console.error);

// Importar modelos
const Usuario = require('../src/models/usuario');
const Producto = require('../src/models/producto');

// Importar controladores
const authController = require('../src/controllers/authController');
const productoController = require('../src/controllers/productoController');

// Importar middlewares
const authMiddleware = require('../src/middleware/authMiddleware');
const { validateLogin, validateUser, validateProducto } = require('../src/middleware/validate');

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API backend funcionando en Vercel con MongoDB',
    version: '3.0.0',
    timestamp: new Date().toISOString(),
    mongoStatus: mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado'
  });
});

// Rutas de autenticación
app.post('/api/auth/login', validateLogin, authController.login);
app.post('/api/auth/register', validateUser, authController.register);
app.get('/api/auth/verify', authMiddleware, authController.verifyToken);

// Rutas de productos (públicas)
app.get('/api/producto', productoController.obtenerProductos);
app.get('/api/producto/buscar', productoController.buscarProductos);
app.get('/api/producto/categoria/:categoria', productoController.obtenerProductosPorCategoria);
app.get('/api/producto/:id', productoController.obtenerProductoPorId);

// Rutas de productos (privadas)
app.post('/api/producto', authMiddleware, validateProducto, productoController.crearProducto);
app.put('/api/producto/:id', authMiddleware, validateProducto, productoController.actualizarProducto);
app.delete('/api/producto/:id', authMiddleware, productoController.eliminarProducto);
app.delete('/api/producto/:id/permanente', authMiddleware, productoController.eliminarProductoPermanente);

// Alias para compatibilidad
app.get('/api/productos', (req, res) => res.redirect('/api/producto'));
app.post('/api/productos', (req, res) => res.redirect('/api/producto'));
app.get('/api/products', (req, res) => res.redirect('/api/producto'));
app.post('/api/products', (req, res) => res.redirect('/api/producto'));

// Manejo de rutas inexistentes
app.use((req, res) => {
  res.status(404).json({ 
    error: "Ruta no encontrada",
    path: req.path,
    method: req.method
  });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    error: "Error interno del servidor",
    message: err.message
  });
});

module.exports = app; 