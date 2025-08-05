const express = require('express');
const cors = require('cors');

const app = express();

// CORS configurado para Vercel
app.use(cors({
  origin: 'https://frontend-techstore.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Middleware para parsing JSON
app.use(express.json());

// Middleware adicional para CORS
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  
  res.header('Access-Control-Allow-Origin', 'https://frontend-techstore.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request for:', req.path);
    res.status(200).end();
    return;
  }
  
  next();
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API backend funcionando en Vercel',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// Ruta de productos simplificada
app.get('/api/producto', (req, res) => {
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
});

// Crear producto
app.post('/api/producto', (req, res) => {
  try {
    console.log('POST /api/producto - Endpoint llamado');
    console.log('Body recibido:', req.body);
    
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

// Alias para compatibilidad
app.get('/api/productos', (req, res) => {
  res.redirect('/api/producto');
});

app.post('/api/productos', (req, res) => {
  res.redirect('/api/producto');
});

app.get('/api/products', (req, res) => {
  res.redirect('/api/producto');
});

app.post('/api/products', (req, res) => {
  res.redirect('/api/producto');
});

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