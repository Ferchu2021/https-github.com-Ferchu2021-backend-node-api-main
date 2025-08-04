// Redirigir a app.js principal
const app = require('../src/app.js');

// Configuración específica para Vercel
app.use((req, res, next) => {
  // Headers CORS específicos para Vercel
  res.setHeader('Access-Control-Allow-Origin', 'https://frontend-techstore.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Vercel OPTIONS handler called for:', req.path);
    res.status(200).end();
    return;
  }
  
  next();
});

module.exports = app; 