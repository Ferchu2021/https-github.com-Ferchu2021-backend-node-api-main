const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getUsuarios,
  crearUsuario,
  getUsuarioById,
  actualizarUsuario,
  eliminarUsuario,
  loginUsuario
} = require('../controllers/usuarioController');

const router = express.Router();

// Rutas públicas
router.get('/', getUsuarios);                    // GET /api/usuarios - Listar usuarios (público)
router.post('/login', loginUsuario);             // POST /api/usuarios/login - Login

// Rutas privadas (requieren autenticación)
router.post('/', authMiddleware, crearUsuario);                  // POST /api/usuarios - Crear nuevo usuario
router.get('/:id', authMiddleware, getUsuarioById);              // GET /api/usuarios/:id - Obtener usuario por ID
router.put('/:id', authMiddleware, actualizarUsuario);           // PUT /api/usuarios/:id - Actualizar usuario
router.delete('/:id', authMiddleware, eliminarUsuario);          // DELETE /api/usuarios/:id - Eliminar usuario

module.exports = router; 