const fs = require('fs');
const path = require('path');

// URL de MongoDB Atlas proporcionada por el usuario
const mongoUrl = 'mongodb+srv://mariafernandarodriguezuai:db_123456.a@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority';

// Configuración completa del archivo .env
const envConfig = `# MongoDB Atlas
MONGO_URI=${mongoUrl}

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
  
  console.log('✅ Archivo .env actualizado correctamente!');
  console.log('\n🔗 URL de MongoDB Atlas configurada:');
  console.log(`   ${mongoUrl}`);
  console.log('\n🧪 Ahora puedes probar la conexión:');
  console.log('   npm start');
  console.log('   npm run create-admin');
  console.log('   npm test');
  
} catch (error) {
  console.error('❌ Error actualizando archivo .env:', error.message);
} 