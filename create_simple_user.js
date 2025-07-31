const fs = require('fs');
const path = require('path');

console.log('🔧 Creando usuario simple para MongoDB Atlas');
console.log('============================================\n');

console.log('📋 Pasos para crear un usuario simple:');
console.log('');
console.log('1. 🌐 Ve a MongoDB Atlas: https://cloud.mongodb.com');
console.log('2. 📝 Inicia sesión con tu cuenta');
console.log('3. 🔐 Ve a "Database Access"');
console.log('4. ➕ Haz clic en "Add New Database User"');
console.log('5. 📝 Configura el nuevo usuario:');
console.log('   - Username: backend');
console.log('   - Password: backend123');
console.log('   - Database User Privileges: Read and write to any database');
console.log('6. ✅ Haz clic en "Add User"');
console.log('');

// URL con el nuevo usuario simple
const simpleMongoUrl = 'mongodb+srv://backend:backend123@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority';

// Configuración del archivo .env
const envConfig = `# MongoDB Atlas
MONGO_URI=${simpleMongoUrl}

# Servidor
PORT=3001
NODE_ENV=development

# JWT
JWT_SECRET=tu_secreto_jwt_super_seguro_aqui_para_desarrollo

# Frontend
FRONTEND_URL=http://localhost:3000

# Logs
LOG_LEVEL=info
`;

// Ruta del archivo .env
const envPath = path.join(__dirname, '.env');

// Función para actualizar el archivo .env
const updateEnvFile = () => {
  try {
    // Escribir el archivo .env
    fs.writeFileSync(envPath, envConfig);
    
    console.log('✅ Archivo .env actualizado con usuario simple!');
    console.log('\n🔗 Nueva URL de MongoDB Atlas:');
    console.log(`   mongodb+srv://backend:***@cluster0.mhwnsc1.mongodb.net/backend-node-api`);
    console.log('\n🧪 Ahora puedes probar la conexión:');
    console.log('   npm start');
    console.log('   npm run create-admin');
    console.log('   npm test');
    
  } catch (error) {
    console.error('❌ Error actualizando archivo .env:', error.message);
  }
};

// Actualizar automáticamente
updateEnvFile();

console.log('\n📖 Si necesitas ayuda, consulta:');
console.log('   - MONGODB_SETUP.md');
console.log('   - MONGODB_TROUBLESHOOTING.md'); 