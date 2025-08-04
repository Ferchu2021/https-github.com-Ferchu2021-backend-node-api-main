// Controlador de datos simple
const getPublic = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      mensaje: 'Datos públicos',
      data: [
        { id: 1, nombre: 'Producto 1', precio: 100 },
        { id: 2, nombre: 'Producto 2', precio: 200 },
        { id: 3, nombre: 'Producto 3', precio: 300 }
      ]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener datos públicos',
      error: error.message
    });
  }
};

const getPrivate = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      mensaje: 'Datos privados',
      data: [
        { id: 1, nombre: 'Dato Privado 1', usuario: req.user.email },
        { id: 2, nombre: 'Dato Privado 2', usuario: req.user.email }
      ]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener datos privados',
      error: error.message
    });
  }
};

const create = async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    
    res.status(201).json({
      success: true,
      mensaje: 'Dato creado exitosamente',
      data: {
        id: Date.now(),
        nombre,
        precio,
        usuario: req.user.email
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      mensaje: 'Error al crear dato',
      error: error.message
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    
    res.status(200).json({
      success: true,
      mensaje: 'Dato actualizado exitosamente',
      data: {
        id,
        nombre,
        precio,
        usuario: req.user.email
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      mensaje: 'Error al actualizar dato',
      error: error.message
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    
    res.status(200).json({
      success: true,
      mensaje: 'Dato eliminado exitosamente',
      data: { id }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      mensaje: 'Error al eliminar dato',
      error: error.message
    });
  }
};

module.exports = {
  getPublic,
  getPrivate,
  create,
  update,
  remove
};
