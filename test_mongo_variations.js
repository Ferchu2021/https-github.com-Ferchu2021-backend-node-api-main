require('dotenv').config();
const mongoose = require('mongoose');

console.log('🧪 Probando diferentes configuraciones de MongoDB Atlas');
console.log('======================================================\n');

// Diferentes variaciones de la URL
const testUrls = [
  {
    name: 'Usuario simple (backend)',
    url: 'mongodb+srv://backend:backend123@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority'
  },
  {
    name: 'Usuario con caracteres especiales',
    url: 'mongodb+srv://backend-user:Backend123!@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority'
  },
  {
    name: 'Usuario original',
    url: 'mongodb+srv://mariafernandarodriguezuai:db_123456.a@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority'
  },
  {
    name: 'Sin base de datos específica',
    url: 'mongodb+srv://backend:backend123@cluster0.mhwnsc1.mongodb.net/?retryWrites=true&w=majority'
  }
];

const testConnection = async (testUrl) => {
  try {
    console.log(`🔄 Probando: ${testUrl.name}`);
    console.log(`   URL: ${testUrl.url.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
    
    await mongoose.connect(testUrl.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ ¡Conexión exitosa!');
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Database: ${mongoose.connection.name}`);
    
    await mongoose.disconnect();
    return true;
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    return false;
  }
};

const runTests = async () => {
  console.log('🚀 Iniciando pruebas...\n');
  
  for (const testUrl of testUrls) {
    const success = await testConnection(testUrl);
    console.log('');
    
    if (success) {
      console.log('🎉 ¡Encontramos una configuración que funciona!');
      console.log(`   Usa esta URL: ${testUrl.url}`);
      break;
    }
  }
  
  console.log('📋 Si ninguna funciona, verifica:');
  console.log('   1. Que el usuario existe en MongoDB Atlas');
  console.log('   2. Que la contraseña es correcta');
  console.log('   3. Que Network Access permite tu IP');
  console.log('   4. Que el cluster está activo');
};

runTests(); 