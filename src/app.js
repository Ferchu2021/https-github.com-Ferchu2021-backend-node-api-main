require("dotenv").config();

const usuariosRoutes = require('./routes/usuario');

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan"); // Logger de solicitudes HTTP
const helmet = require("helmet"); // Seguridad HTTP headers

const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/data");

const app = express();

// Middlewares globales
app.use(helmet()); // Seguridad básica
app.use(cors({
  origin: process.env.FRONTEND_URL || "*", // Mejor restringir en producción
  credentials: true,
}));
app.use(express.json());
app.use(morgan("dev")); // Logging HTTP para desarrollo

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API backend-node-api funcionando correctamente.');
});

// Manejo de rutas inexistentes (404)
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
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
  app.listen(port, () => console.log(`🚀 Servidor escuchando en puerto ${port}`));
})
.catch((err) => {
  console.error("❌ Error de conexión a MongoDB:", err.message);
});
