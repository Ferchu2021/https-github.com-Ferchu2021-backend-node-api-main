require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");

// Importar middlewares y utilidades
const { generalLimiter, authLimiter } = require('./middleware/rateLimit');
const { logRequest, logError, logger } = require('./utils/logger');

// Importar rutas
const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/data");
const usuariosRoutes = require('./routes/usuarioRoutes');
const firebaseRoutes = require('./routes/firebase');
const productosRoutes = require('./routes/productos');

const app = express();

// Middlewares de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configurado
app.use(cors({
  origin: [
    'https://frontend-techstore.vercel.app',
    'https://frontend-techstore.vercel.app/',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200
}));

// Middleware CORS adicional para preflight requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://frontend-techstore.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middlewares de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(logRequest);
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Rate limiting
app.use('/api/', generalLimiter);
app.use('/api/auth', authLimiter);

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/firebase', firebaseRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/products', productosRoutes); // Alias en inglés para compatibilidad

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API backend-node-api funcionando correctamente',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      usuarios: '/api/usuarios',
      data: '/api/data',
      firebase: '/api/firebase',
      productos: '/api/productos',
      products: '/api/products'
    }
  });
});

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Manejo de rutas inexistentes (404)
app.use((req, res, next) => {
  res.status(404).json({ 
    error: "Ruta no encontrada",
    path: req.path,
    method: req.method
  });
});

// Middleware de logging de errores
app.use(logError);

// Manejo global de errores
app.use((err, req, res, next) => {
  logger.error('Unhandled Error:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });

  // No enviar detalles del error en producción
  const errorResponse = {
    error: "Error interno del servidor"
  };

  if (process.env.NODE_ENV !== 'production') {
    errorResponse.details = err.message;
    errorResponse.stack = err.stack;
  }

  res.status(500).json(errorResponse);
});

// Conexión a MongoDB y arranque del servidor
console.log('Intentando conectar a MongoDB...');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conexión exitosa a MongoDB');
  
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`🚀 Servidor escuchando en puerto ${port}`);
    console.log(`📊 Modo: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 URL: http://localhost:${port}`);
    
    logger.info('Servidor iniciado correctamente', {
      port,
      environment: process.env.NODE_ENV || 'development',
      mongoUri: process.env.MONGO_URI ? 'Configurado' : 'No configurado'
    });
  });
})
.catch((err) => {
  console.error("❌ Error de conexión a MongoDB:", err.message);
  logger.error('Error conectando a MongoDB:', err);
  process.exit(1);
});

// Manejo de señales de terminación
process.on('SIGTERM', () => {
  logger.info('SIGTERM recibido, cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT recibido, cerrando servidor...');
  process.exit(0);
});

module.exports = app;
