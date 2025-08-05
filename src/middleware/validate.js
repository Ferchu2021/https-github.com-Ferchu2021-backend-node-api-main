// Middleware/validate.js

const { body, param, query, validationResult } = require('express-validator');

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Datos de entrada inválidos',
      details: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// Validaciones para usuarios
const validateUser = [
  body('nombre')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras y espacios'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Debe ser un email válido'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
  
  body('rol')
    .optional()
    .isIn(['admin', 'usuario'])
    .withMessage('El rol debe ser admin o usuario'),
  
  handleValidationErrors
];

// Validaciones para actualización de usuario
const validateUserUpdate = [
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Debe ser un email válido'),
  
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  
  body('rol')
    .optional()
    .isIn(['admin', 'usuario'])
    .withMessage('El rol debe ser admin o usuario'),
  
  handleValidationErrors
];

// Validaciones para ID de MongoDB
const validateMongoId = [
  param('id')
    .isMongoId()
    .withMessage('ID de usuario inválido'),
  
  handleValidationErrors
];

// Validaciones para paginación
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La página debe ser un número mayor a 0'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('El límite debe ser un número entre 1 y 100'),
  
  handleValidationErrors
];

// Validaciones para productos
const validateProducto = [
  body('nombre')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-\.]+$/)
    .withMessage('El nombre contiene caracteres no válidos'),
  
  body('precio')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número mayor o igual a 0'),
  
  body('descripcion')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('La descripción debe tener entre 10 y 500 caracteres'),
  
  body('categoria')
    .isIn(['Laptops', 'Monitores', 'Teclados', 'Mouse', 'Auriculares', 'Otros'])
    .withMessage('Categoría no válida'),
  
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero mayor o igual a 0'),
  
  body('imagen')
    .optional()
    .isURL()
    .withMessage('La imagen debe ser una URL válida'),
  
  handleValidationErrors
];

// Validaciones para actualización de producto
const validateProductoUpdate = [
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  
  body('precio')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número mayor o igual a 0'),
  
  body('descripcion')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('La descripción debe tener entre 10 y 500 caracteres'),
  
  body('categoria')
    .optional()
    .isIn(['Laptops', 'Monitores', 'Teclados', 'Mouse', 'Auriculares', 'Otros'])
    .withMessage('Categoría no válida'),
  
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero mayor o igual a 0'),
  
  body('imagen')
    .optional()
    .isURL()
    .withMessage('La imagen debe ser una URL válida'),
  
  handleValidationErrors
];

// Validaciones para búsqueda
const validateSearch = [
  query('search')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('La búsqueda debe tener al menos 2 caracteres'),
  
  query('rol')
    .optional()
    .isIn(['admin', 'usuario'])
    .withMessage('El rol debe ser admin o usuario'),
  
  query('estado')
    .optional()
    .isBoolean()
    .withMessage('El estado debe ser true o false'),
  
  handleValidationErrors
];

// Validaciones para login
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Debe ser un email válido'),
  
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida'),
  
  handleValidationErrors
];

module.exports = {
  validateUser,
  validateUserUpdate,
  validateMongoId,
  validatePagination,
  validateSearch,
  validateLogin,
  handleValidationErrors,
  validateProducto,
  validateProductoUpdate
};
