const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del producto es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede tener más de 100 caracteres']
  },
  precio: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: [0, 'El precio no puede ser negativo']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true,
    maxlength: [500, 'La descripción no puede tener más de 500 caracteres']
  },
  categoria: {
    type: String,
    required: [true, 'La categoría es requerida'],
    enum: {
      values: ['Laptops', 'Monitores', 'Teclados', 'Mouse', 'Auriculares', 'Otros'],
      message: 'Categoría no válida'
    }
  },
  stock: {
    type: Number,
    required: [true, 'El stock es requerido'],
    min: [0, 'El stock no puede ser negativo'],
    default: 0
  },
  imagen: {
    type: String,
    default: ''
  },
  activo: {
    type: Boolean,
    default: true
  },
  creadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
}, {
  timestamps: true
});

// Índices para mejorar rendimiento
productoSchema.index({ nombre: 'text', descripcion: 'text' });
productoSchema.index({ categoria: 1 });
productoSchema.index({ activo: 1 });

// Método para obtener productos activos
productoSchema.statics.findActive = function() {
  return this.find({ activo: true });
};

// Método para buscar por categoría
productoSchema.statics.findByCategory = function(categoria) {
  return this.find({ categoria, activo: true });
};

// Método para búsqueda de texto
productoSchema.statics.search = function(query) {
  return this.find({
    $and: [
      { activo: true },
      {
        $or: [
          { nombre: { $regex: query, $options: 'i' } },
          { descripcion: { $regex: query, $options: 'i' } }
        ]
      }
    ]
  });
};

// Método para actualizar stock
productoSchema.methods.updateStock = function(cantidad) {
  this.stock = Math.max(0, this.stock + cantidad);
  return this.save();
};

// Método para desactivar producto (baja lógica)
productoSchema.methods.deactivate = function() {
  this.activo = false;
  return this.save();
};

// Método para activar producto
productoSchema.methods.activate = function() {
  this.activo = true;
  return this.save();
};

module.exports = mongoose.model('Producto', productoSchema); 