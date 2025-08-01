require('dotenv').config();
const mongoose = require('mongoose');

console.log('🧪 Probando variaciones del usuario db_backend');
console.log('============================================\n');

// Diferentes variaciones de la URL
const testUrls = [
  {
    name: 'URL original del usuario',
    url: 'mongodb+srv://db_backend:db_backend123@cluster0.mhwnsc1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  },
  {
    name: 'Con base de datos específica',
    url: 'mongodb+srv://db_backend:db_backend123@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority&appName=Cluster0'
  },
  {
    name: 'Sin appName',
    url: 'mongodb+srv://db_backend:db_backend123@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority'
  },
  {
    name: 'Sin parámetros adicionales',
    url: 'mongodb+srv://db_backend:db_backend123@cluster0.mhwnsc1.mongodb.net/backend-node-api'
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
  
  console.log('📋 Si ninguna funciona, verifica en MongoDB Atlas:');
  console.log('   1. Que existe el usuario "db_backend"');
  console.log('   2. Que la contraseña es "db_backend123"');
  console.log('   3. Que tiene permisos "Read and write to any database"');
  console.log('   4. Que Network Access permite tu IP');
  console.log('   5. Que el cluster está activo');
};

runTests(); 