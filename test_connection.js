require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔗 Probando conexión a MongoDB Atlas...\n');

// Mostrar la URL (sin la contraseña por seguridad)
const mongoUri = process.env.MONGO_URI;
if (mongoUri) {
  const safeUri = mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
  console.log('📝 URL de conexión:');
  console.log(`   ${safeUri}`);
} else {
  console.log('❌ Error: MONGO_URI no encontrada en el archivo .env');
  process.exit(1);
}

// Función para probar la conexión
const testConnection = async () => {
  try {
    console.log('\n🔄 Intentando conectar...');
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 segundos de timeout
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ ¡Conexión exitosa a MongoDB Atlas!');
    console.log('\n📊 Información de la conexión:');
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Port: ${mongoose.connection.port}`);
    console.log(`   Database: ${mongoose.connection.name}`);
    console.log(`   Ready State: ${mongoose.connection.readyState}`);
    
    // Listar las bases de datos disponibles
    const adminDb = mongoose.connection.db.admin();
    const dbs = await adminDb.listDatabases();
    console.log('\n🗄️  Bases de datos disponibles:');
    dbs.databases.forEach(db => {
      console.log(`   - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
    });
    
    console.log('\n🎉 ¡Todo está funcionando correctamente!');
    console.log('\n🧪 Ahora puedes ejecutar:');
    console.log('   npm start');
    console.log('   npm run create-admin');
    console.log('   npm test');
    
  } catch (error) {
    console.log('\n❌ Error de conexión:');
    console.log(`   ${error.message}`);
    
    if (error.message.includes('bad auth')) {
      console.log('\n🔧 Posibles soluciones:');
      console.log('   1. Verifica que el usuario existe en MongoDB Atlas');
      console.log('   2. Verifica que la contraseña sea correcta');
      console.log('   3. Verifica que el usuario tenga permisos de lectura/escritura');
      console.log('   4. Verifica que tu IP esté en la whitelist');
      console.log('\n📖 Consulta MONGODB_TROUBLESHOOTING.md para más detalles');
    } else if (error.message.includes('timeout')) {
      console.log('\n🔧 Posibles soluciones:');
      console.log('   1. Verifica tu conexión a internet');
      console.log('   2. Verifica que el cluster esté activo');
      console.log('   3. Verifica que tu IP esté en la whitelist');
    }
    
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Desconectado de MongoDB');
  }
};

// Ejecutar la prueba
testConnection(); 