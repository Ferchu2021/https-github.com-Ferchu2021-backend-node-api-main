import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Rutas de base de datos
router.get('/status', async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      mensaje: 'Estado de la base de datos',
      timestamp: new Date().toISOString(),
      status: 'OK'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al verificar estado de la base de datos',
      error: error.message
    });
  }
});

router.get('/stats', authMiddleware, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      mensaje: 'Estadísticas de la base de datos',
      stats: {
        collections: ['usuarios', 'productos'],
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener estadísticas',
      error: error.message
    });
  }
});

export default router; 