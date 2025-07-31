const fs = require('fs');
const path = require('path');

// URL de MongoDB Atlas con la contraseña correctamente codificada
// Los caracteres especiales en la contraseña necesitan ser codificados
const mongoUrl = 'mongodb+srv://mariafernandarodriguezuai:db_123456.a@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority';

// Intentar con diferentes codificaciones de la contraseña
const possibleUrls = [
  // URL original
  'mongodb+srv://mariafernandarodriguezuai:db_123456.a@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority',
  // Con el punto codificado
  'mongodb+srv://mariafernandarodriguezuai:db_123456%2Ea@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority',
  // Con el punto como %2E
  'mongodb+srv://mariafernandarodriguezuai:db_123456%2ea@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority',
  // Sin el punto
  'mongodb+srv://mariafernandarodriguezuai:db_123456a@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority'
];

// Configuración del archivo .env con la primera URL
const envConfig = `# MongoDB Atlas
MONGO_URI=${possibleUrls[1]}

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

try {
  // Escribir el archivo .env
  fs.writeFileSync(envPath, envConfig);
  
  console.log('✅ Archivo .env actualizado con la contraseña codificada!');
  console.log('\n🔗 URL de MongoDB Atlas configurada:');
  console.log(`   ${possibleUrls[1]}`);
  console.log('\n📝 Nota: La contraseña se codificó para manejar caracteres especiales');
  console.log('\n🧪 Ahora puedes probar la conexión:');
  console.log('   npm start');
  console.log('   npm run create-admin');
  console.log('   npm test');
  
  console.log('\n🔄 Si aún hay problemas, prueba estas URLs alternativas:');
  possibleUrls.forEach((url, index) => {
    console.log(`   ${index + 1}. ${url}`);
  });
  
} catch (error) {
  console.error('❌ Error actualizando archivo .env:', error.message);
} 