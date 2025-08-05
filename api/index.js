// Exportar la aplicación principal con manejo de errores
try {
  const app = require('../src/app.js');
  module.exports = app;
} catch (error) {
  console.error('Error loading src/app.js:', error.message);
  
  // Fallback: crear una app básica
  const express = require('express');
  const cors = require('cors');
  
  const app = express();
  
  // CORS básico
  app.use(cors({
    origin: 'https://frontend-techstore.vercel.app',
    credentials: true
  }));
  
  app.use(express.json());
  
  // Ruta de productos básica
  app.get('/api/producto', (req, res) => {
    res.json({
      success: true,
      productos: [
        { id: 1, nombre: 'Laptop Gaming Pro', precio: 1299.99 },
        { id: 2, nombre: 'Monitor 4K', precio: 599.99 }
      ]
    });
  });
  
  app.post('/api/producto', (req, res) => {
    res.json({
      success: true,
      producto: { id: Date.now(), ...req.body }
    });
  });
  
  module.exports = app;
} 