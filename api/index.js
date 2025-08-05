// Configurar variables de entorno para Vercel
require('dotenv').config();

// Exportar la aplicación principal
const express = require('express');
const cors = require('cors');

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

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API backend funcionando en Vercel',
    version: '4.0.0',
    timestamp: new Date().toISOString(),
    status: 'OK'
  });
});

// Rutas básicas de productos (públicas)
app.get('/api/producto', async (req, res) => {
  try {
    console.log('GET /api/producto - Endpoint llamado');
    
    res.status(200).json({
      success: true,
      mensaje: 'Lista de productos obtenida exitosamente',
      timestamp: new Date().toISOString(),
      productos: [
        {
          _id: '1',
          nombre: 'Laptop Gaming Pro',
          precio: 1299.99,
          descripcion: 'Laptop de alto rendimiento para gaming',
          categoria: 'Laptops',
          stock: 15
        },
        {
          _id: '2',
          nombre: 'Monitor 4K Ultra HD',
          precio: 599.99,
          descripcion: 'Monitor de 27" con resolución 4K',
          categoria: 'Monitores',
          stock: 8
        }
      ]
    });
  } catch (error) {
    console.error('Error en GET /api/producto:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener productos',
      error: error.message
    });
  }
});

// Crear producto (público para pruebas)
app.post('/api/producto', async (req, res) => {
  try {
    console.log('POST /api/producto - Endpoint llamado');
    console.log('Body recibido:', req.body);
    
    const { nombre, precio, descripcion, categoria, stock } = req.body;
    
    res.status(201).json({
      success: true,
      mensaje: 'Producto creado exitosamente',
      producto: {
        _id: Date.now().toString(),
        nombre,
        precio,
        descripcion,
        categoria,
        stock: stock || 0
      }
    });
  } catch (error) {
    console.error('Error en POST /api/producto:', error);
    res.status(400).json({
      success: false,
      mensaje: 'Error al crear producto',
      error: error.message
    });
  }
});

// Login básico para pruebas
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Login de prueba
    if (email === 'admin@techstore.com' && password === 'Admin123!') {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      
      res.status(200).json({
        success: true,
        mensaje: 'Login exitoso',
        token,
        usuario: {
          _id: '1234567890',
          nombre: 'Admin',
          email: 'admin@techstore.com'
        }
      });
    } else {
      res.status(401).json({
        success: false,
        mensaje: 'Credenciales inválidas'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error en el servidor',
      error: error.message
    });
  }
});

// Verificar token básico
app.get('/api/auth/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        mensaje: 'Token de autenticación requerido'
      });
    }
    
    res.status(200).json({
      success: true,
      mensaje: 'Token válido'
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      mensaje: 'Token inválido'
    });
  }
});

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