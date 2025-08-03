const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nombre:   { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  productos: { type: String, required: true },
  activo: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Hook para hash de contraseña
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('contrasena')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar contraseñas
usuarioSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método para obtener datos públicos del usuario
usuarioSchema.methods.toPublicJSON = function() {
  const userObject = this.toObject();
  delete userObject.contrasena;
  return userObject;
};

// Método estático para buscar por email
usuarioSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

module.exports = mongoose.model('Usuario', usuarioSchema);
