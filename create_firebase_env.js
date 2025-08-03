const fs = require('fs');
const path = require('path');

console.log('🔥 Creando archivo .env para Firebase\n');

// Contenido del archivo .env
const envContent = `# MongoDB Configuration
MONGO_URI=mongodb+srv://backend:backend123@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority&appName=Cluster0

# Firebase Admin SDK Configuration
# ⚠️  IMPORTANTE: Reemplaza estos valores con tus credenciales reales de Firebase
FIREBASE_PROJECT_ID=tu-project-id-aqui
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nTU_CLAVE_PRIVADA_AQUI\\n-----END PRIVATE KEY-----\\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@tu-proyecto.iam.gserviceaccount.com

# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=tu-jwt-secret-aqui
JWT_EXPIRES_IN=24h

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
`;

// Ruta del archivo .env
const envPath = path.join(__dirname, '.env');

// Verificar si ya existe
if (fs.existsSync(envPath)) {
  console.log('⚠️  El archivo .env ya existe');
  console.log('   ¿Quieres sobrescribirlo? (s/n)');
  
  // En un entorno real, aquí pedirías confirmación
  // Por ahora, creamos una copia de respaldo
  const backupPath = path.join(__dirname, '.env.backup');
  fs.copyFileSync(envPath, backupPath);
  console.log('   ✅ Se creó una copia de respaldo en .env.backup');
}

// Crear el archivo .env
try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Archivo .env creado exitosamente');
  console.log('');
  console.log('📋 Variables configuradas:');
  console.log('   ✅ MONGO_URI (MongoDB Atlas)');
  console.log('   ⚠️  FIREBASE_PROJECT_ID (necesita configuración)');
  console.log('   ⚠️  FIREBASE_PRIVATE_KEY (necesita configuración)');
  console.log('   ⚠️  FIREBASE_CLIENT_EMAIL (necesita configuración)');
  console.log('   ✅ PORT (3001)');
  console.log('   ✅ NODE_ENV (development)');
  console.log('   ⚠️  JWT_SECRET (necesita configuración)');
  console.log('');
  console.log('🔧 Próximos pasos:');
  console.log('   1. Configura las credenciales de Firebase');
  console.log('   2. Configura JWT_SECRET');
  console.log('   3. Reinicia el servidor');
  console.log('');
  console.log('📝 Para configurar Firebase:');
  console.log('   1. Ve a https://console.firebase.google.com/');
  console.log('   2. Crea un proyecto o selecciona uno existente');
  console.log('   3. Ve a Project Settings > Service Accounts');
  console.log('   4. Haz clic en "Generate new private key"');
  console.log('   5. Descarga el archivo JSON');
  console.log('   6. Copia los valores al archivo .env');
  console.log('');
  console.log('🎯 Una vez configurado, ejecuta:');
  console.log('   npm start');
  
} catch (error) {
  console.error('❌ Error creando archivo .env:', error.message);
} 