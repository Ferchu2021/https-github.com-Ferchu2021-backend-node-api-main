const express = require('express');
const {
  getUsuarios,
  crearUsuario,
  getUsuarioById,
  actualizarUsuario,
  eliminarUsuario,
  buscarUsuarios,
  getEstadisticasUsuarios
} = require('../controllers/usuarioController');

const router = express.Router();

// Rutas principales de usuarios
router.get('/', getUsuarios);                    // GET /api/usuarios - Listar usuarios con paginación
router.post('/', crearUsuario);                  // POST /api/usuarios - Crear nuevo usuario
router.get('/buscar', buscarUsuarios);           // GET /api/usuarios/buscar - Buscar usuarios
router.get('/estadisticas', getEstadisticasUsuarios); // GET /api/usuarios/estadisticas - Estadísticas

// Rutas con parámetros
router.get('/:id', getUsuarioById);              // GET /api/usuarios/:id - Obtener usuario por ID
router.put('/:id', actualizarUsuario);           // PUT /api/usuarios/:id - Actualizar usuario
router.delete('/:id', eliminarUsuario);          // DELETE /api/usuarios/:id - Eliminar usuario

module.exports = router; 