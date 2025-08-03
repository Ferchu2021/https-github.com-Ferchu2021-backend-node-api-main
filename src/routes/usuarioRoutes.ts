import express from 'express';
import {
  getUsuarios,
  crearUsuario,
  getUsuarioById,
  getUsuariosFirebase
} from '../controllers/usuarioController';

const router = express.Router();

// Rutas básicas
router.get('/', getUsuarios);                    // GET /api/usuarios - Listar usuarios
router.post('/', crearUsuario);                  // POST /api/usuarios - Crear nuevo usuario
router.get('/firebase', getUsuariosFirebase);    // GET /api/usuarios/firebase - Listar usuarios de Firebase
router.get('/:id', getUsuarioById);              // GET /api/usuarios/:id - Obtener usuario por ID

export default router; 