const fs = require('fs');
const path = require('path');

// Configuración de variables de entorno
const envConfig = `# MongoDB (Cambia esta URL por tu conexión de MongoDB Atlas)
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/backend-node-api

# Servidor
PORT=3001
NODE_ENV=development

# JWT (Cambia este secreto en producción)
JWT_SECRET=tu_secreto_jwt_super_seguro_aqui_para_desarrollo

# Frontend
FRONTEND_URL=http://localhost:3000

# Logs
LOG_LEVEL=info
`;

// Crear archivo .env
const envPath = path.join(__dirname, '.env');

try {
  fs.writeFileSync(envPath, envConfig);
  console.log('✅ Archivo .env creado exitosamente');
  console.log('\n📝 IMPORTANTE:');
  console.log('1. Cambia MONGO_URI por tu conexión de MongoDB Atlas');
  console.log('2. Cambia JWT_SECRET por un secreto más seguro');
  console.log('3. Para obtener MongoDB Atlas gratuito:');
  console.log('   - Ve a https://www.mongodb.com/atlas');
  console.log('   - Crea una cuenta gratuita');
  console.log('   - Crea un cluster gratuito');
  console.log('   - Obtén la URL de conexión');
  console.log('\n🔗 Ejemplo de MONGO_URI:');
  console.log('mongodb+srv://usuario:password@cluster.mongodb.net/backend-node-api');
  
} catch (error) {
  console.error('❌ Error creando archivo .env:', error.message);
} 