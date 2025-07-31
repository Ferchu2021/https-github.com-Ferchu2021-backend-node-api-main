const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Configurar logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests
  message: { error: 'Demasiadas solicitudes' }
});
app.use(limiter);

// Datos de demostración
let usuarios = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    email: 'juan@ejemplo.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.iK8i', // Password123
    rol: 'admin',
    estado: true,
    fechaCreacion: new Date()
  }
];

let datos = [
  {
    id: 1,
    titulo: 'Dato de ejemplo',
    contenido: 'Este es un dato de demostración',
    fechaCreacion: new Date()
  }
];

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }
    
    const decoded = jwt.verify(token, 'demo_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Rutas públicas
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: 'demo'
  });
});

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de demostración funcionando correctamente',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      usuarios: '/api/usuarios',
      data: '/api/data'
    }
  });
});

// Autenticación
app.post('/api/auth/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    
    // Validaciones básicas
    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    
    if (usuarios.find(u => u.email === email)) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }
    
    // Crear usuario
    const hashedPassword = await bcrypt.hash(password, 12);
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre,
      email,
      password: hashedPassword,
      rol: 'usuario',
      estado: true,
      fechaCreacion: new Date()
    };
    
    usuarios.push(nuevoUsuario);
    
    // Generar token
    const token = jwt.sign(
      { id: nuevoUsuario.id, email: nuevoUsuario.email, rol: nuevoUsuario.rol },
      'demo_secret',
      { expiresIn: '24h' }
    );
    
    const { password: _, ...usuarioPublico } = nuevoUsuario;
    
    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      token,
      usuario: usuarioPublico
    });
    
  } catch (error) {
    logger.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const usuario = usuarios.find(u => u.email === email);
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      'demo_secret',
      { expiresIn: '24h' }
    );
    
    const { password: _, ...usuarioPublico } = usuario;
    
    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: usuarioPublico
    });
    
  } catch (error) {
    logger.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/auth/verify', authMiddleware, (req, res) => {
  const usuario = usuarios.find(u => u.id === req.user.id);
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
  const { password: _, ...usuarioPublico } = usuario;
  res.json({
    mensaje: 'Token válido',
    usuario: usuarioPublico
  });
});

// Usuarios
app.get('/api/usuarios', (req, res) => {
  const { page = 1, limit = 10, search, rol, estado } = req.query;
  const skip = (page - 1) * limit;
  
  let usuariosFiltrados = usuarios.map(u => {
    const { password: _, ...usuario } = u;
    return usuario;
  });
  
  // Filtros
  if (search) {
    usuariosFiltrados = usuariosFiltrados.filter(u => 
      u.nombre.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (rol) {
    usuariosFiltrados = usuariosFiltrados.filter(u => u.rol === rol);
  }
  
  if (estado !== undefined) {
    usuariosFiltrados = usuariosFiltrados.filter(u => u.estado === (estado === 'true'));
  }
  
  // Paginación
  const total = usuariosFiltrados.length;
  const usuariosPaginados = usuariosFiltrados.slice(skip, skip + parseInt(limit));
  
  res.json({
    usuarios: usuariosPaginados,
    paginacion: {
      pagina: parseInt(page),
      limite: parseInt(limit),
      total,
      totalPaginas: Math.ceil(total / limit),
      tieneSiguiente: page < Math.ceil(total / limit),
      tieneAnterior: page > 1
    }
  });
});

app.get('/api/usuarios/perfil/me', authMiddleware, (req, res) => {
  const usuario = usuarios.find(u => u.id === req.user.id);
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
  const { password: _, ...usuarioPublico } = usuario;
  res.json(usuarioPublico);
});

// Datos
app.get('/api/data', (req, res) => {
  res.json({
    mensaje: 'Datos públicos',
    datos: datos,
    total: datos.length
  });
});

app.get('/api/data/private', authMiddleware, (req, res) => {
  res.json({
    mensaje: 'Datos privados',
    datos: datos,
    usuario: req.user,
    total: datos.length
  });
});

app.post('/api/data', authMiddleware, (req, res) => {
  const { titulo, contenido } = req.body;
  
  if (!titulo || !contenido) {
    return res.status(400).json({ error: 'Título y contenido son requeridos' });
  }
  
  const nuevoDato = {
    id: datos.length + 1,
    titulo,
    contenido,
    fechaCreacion: new Date(),
    usuarioId: req.user.id
  };
  
  datos.push(nuevoDato);
  
  res.status(201).json({
    mensaje: 'Dato creado exitosamente',
    dato: nuevoDato
  });
});

// Manejo de errores
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    path: req.path,
    method: req.method
  });
});

app.use((err, req, res, next) => {
  logger.error('Error:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 Servidor de demostración escuchando en puerto ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log('\n👤 Usuario de prueba:');
  console.log('   Email: juan@ejemplo.com');
  console.log('   Contraseña: Password123');
  console.log('   Rol: admin');
  console.log('\n🧪 Para probar:');
  console.log('   npm test');
});

module.exports = app; 