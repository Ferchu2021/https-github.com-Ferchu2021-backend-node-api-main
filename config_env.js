// Configuración de variables de entorno para desarrollo
// Copia este archivo como .env y configura tus valores reales

const config = {
  // MongoDB Atlas Connection String
  MONGO_URI: 'mongodb+srv://usuario:password@cluster.mongodb.net/database?retryWrites=true&w=majority',
  
  // JWT Secret Key (genera una clave segura)
  JWT_SECRET: 'tu_clave_secreta_super_segura_para_jwt_2024',
  
  // Firebase Configuration
  FIREBASE_PROJECT_ID: 'tu-proyecto-firebase',
  FIREBASE_CLIENT_EMAIL: 'firebase-adminsdk@tu-proyecto.iam.gserviceaccount.com',
  FIREBASE_PRIVATE_KEY: '-----BEGIN PRIVATE KEY-----\nTU_CLAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n',
  
  // Environment
  NODE_ENV: 'development',
  PORT: 3001
};

// Exportar configuración
module.exports = config;

console.log('📋 VARIABLES DE ENTORNO REQUERIDAS:');
console.log('====================================');
console.log('1. MONGO_URI: Conexión a MongoDB Atlas');
console.log('2. JWT_SECRET: Clave secreta para JWT');
console.log('3. FIREBASE_PROJECT_ID: ID del proyecto Firebase');
console.log('4. FIREBASE_CLIENT_EMAIL: Email del cliente Firebase');
console.log('5. FIREBASE_PRIVATE_KEY: Clave privada de Firebase');
console.log('\n📝 INSTRUCCIONES:');
console.log('1. Crea un archivo .env en la raíz del proyecto');
console.log('2. Copia las variables de arriba con tus valores reales');
console.log('3. Para Vercel: Configura estas variables en el dashboard'); 