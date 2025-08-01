const fs = require('fs');
const path = require('path');

console.log('🔧 Actualizando con las credenciales correctas');
console.log('============================================\n');

// Credenciales correctas proporcionadas por el usuario
const correctMongoUrl = 'mongodb+srv://backend:backend123@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority&appName=Cluster0';

// Configuración del archivo .env
const envConfig = `# MongoDB Atlas
MONGO_URI=${correctMongoUrl}

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
    
    console.log('✅ Archivo .env actualizado con las credenciales correctas!');
    console.log('\n🔗 URL de MongoDB Atlas configurada:');
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

console.log('\n📋 Verificaciones necesarias:');
console.log('1. ✅ Usuario: backend');
console.log('2. ✅ Contraseña: backend123');
console.log('3. ❓ Verifica que el usuario existe en MongoDB Atlas');
console.log('4. ❓ Verifica que Network Access permite tu IP');
console.log('\n🔄 Ejecuta: node test_connection.js'); 