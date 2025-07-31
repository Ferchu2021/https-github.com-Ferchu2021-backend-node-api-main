require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('./src/models/usuario');

const createAdminUser = async () => {
  try {
    console.log('🔗 Conectando a MongoDB...');
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Conexión exitosa a MongoDB');
    
    // Verificar si ya existe un admin
    const existingAdmin = await Usuario.findOne({ rol: 'admin' });
    if (existingAdmin) {
      console.log('⚠️  Ya existe un usuario administrador:');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Nombre: ${existingAdmin.nombre}`);
      console.log(`   ID: ${existingAdmin._id}`);
      return;
    }
    
    // Crear usuario admin
    const adminUser = new Usuario({
      nombre: 'Administrador',
      email: 'admin@ejemplo.com',
      password: 'Admin123',
      rol: 'admin',
      estado: true
    });
    
    await adminUser.save();
    
    console.log('✅ Usuario administrador creado exitosamente:');
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Contraseña: Admin123`);
    console.log(`   Nombre: ${adminUser.nombre}`);
    console.log(`   ID: ${adminUser._id}`);
    console.log(`   Rol: ${adminUser.rol}`);
    
    console.log('\n🔐 Credenciales de acceso:');
    console.log('   Email: admin@ejemplo.com');
    console.log('   Contraseña: Admin123');
    
    console.log('\n📝 Para obtener el token JWT, haz login con:');
    console.log('   POST http://localhost:3001/api/auth/login');
    console.log('   { "email": "admin@ejemplo.com", "password": "Admin123" }');
    
  } catch (error) {
    console.error('❌ Error creando usuario admin:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Desconectado de MongoDB');
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  createAdminUser();
}

module.exports = { createAdminUser }; 