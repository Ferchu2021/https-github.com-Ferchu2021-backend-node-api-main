const fs = require('fs');
const path = require('path');

console.log('🔥 Configuración Completa de Firebase Admin SDK\n');

// Verificar archivo .env
const envPath = path.join(__dirname, '.env');
let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  console.log('✅ Archivo .env encontrado');
} else {
  console.log('❌ Archivo .env no encontrado');
  console.log('   Ejecuta primero: node create_firebase_env.js');
  process.exit(1);
}

// Verificar variables de Firebase
const firebaseVars = {
  FIREBASE_PROJECT_ID: envContent.includes('FIREBASE_PROJECT_ID='),
  FIREBASE_PRIVATE_KEY: envContent.includes('FIREBASE_PRIVATE_KEY='),
  FIREBASE_CLIENT_EMAIL: envContent.includes('FIREBASE_CLIENT_EMAIL=')
};

console.log('\n📋 Estado de configuración de Firebase:\n');

Object.entries(firebaseVars).forEach(([varName, isConfigured]) => {
  if (isConfigured) {
    console.log(`   ✅ ${varName} (configurada)`);
  } else {
    console.log(`   ❌ ${varName} (faltante)`);
  }
});

const allConfigured = Object.values(firebaseVars).every(Boolean);

if (allConfigured) {
  console.log('\n🎉 ¡Firebase está configurado!');
  console.log('   Puedes probar los endpoints ahora.');
} else {
  console.log('\n🔧 Pasos para configurar Firebase:\n');
  
  console.log('1️⃣ Ve a Firebase Console:');
  console.log('   https://console.firebase.google.com/');
  console.log('');
  
  console.log('2️⃣ Crea un nuevo proyecto o selecciona uno existente');
  console.log('');
  
  console.log('3️⃣ Habilita Authentication:');
  console.log('   - Ve a Authentication > Sign-in method');
  console.log('   - Habilita "Email/Password"');
  console.log('');
  
  console.log('4️⃣ Habilita Firestore Database:');
  console.log('   - Ve a Firestore Database');
  console.log('   - Haz clic en "Create database"');
  console.log('   - Selecciona "Start in test mode"');
  console.log('');
  
  console.log('5️⃣ Obtén las credenciales de Admin SDK:');
  console.log('   - Ve a Project Settings (⚙️)');
  console.log('   - Pestaña "Service accounts"');
  console.log('   - Haz clic en "Generate new private key"');
  console.log('   - Descarga el archivo JSON');
  console.log('');
  
  console.log('6️⃣ Configura las variables en .env:');
  console.log('   Abre el archivo JSON descargado y copia:');
  console.log('   - project_id → FIREBASE_PROJECT_ID');
  console.log('   - private_key → FIREBASE_PRIVATE_KEY');
  console.log('   - client_email → FIREBASE_CLIENT_EMAIL');
  console.log('');
  
  console.log('⚠️  IMPORTANTE:');
  console.log('   - La FIREBASE_PRIVATE_KEY debe estar entre comillas dobles');
  console.log('   - Los \\n en la clave privada deben mantenerse');
  console.log('   - Nunca compartas estas credenciales');
  console.log('');
  
  console.log('7️⃣ Reinicia el servidor:');
  console.log('   npm start');
  console.log('');
  
  console.log('8️⃣ Prueba los endpoints:');
  console.log('   node test_firebase.js');
  console.log('');
}

console.log('\n🎯 Endpoints disponibles una vez configurado:');
console.log('   POST /api/firebase/auth/login - Autenticar usuarios');
console.log('   POST /api/firebase/auth/register - Registrar usuarios');
console.log('   POST /api/firebase/firestore/:collection - Crear documentos');
console.log('   GET  /api/firebase/firestore/:collection - Obtener documentos');
console.log('   PUT  /api/firebase/firestore/:collection/:id - Actualizar documentos');
console.log('   DELETE /api/firebase/firestore/:collection/:id - Eliminar documentos');
console.log('');

console.log('📚 Recursos adicionales:');
console.log('   - Firebase Console: https://console.firebase.google.com/');
console.log('   - Firebase Admin SDK: https://firebase.google.com/docs/admin/setup');
console.log('   - Firestore: https://firebase.google.com/docs/firestore/admin/start');
console.log('');

if (!allConfigured) {
  console.log('🚀 ¿Listo para configurar Firebase?');
  console.log('   Sigue los pasos anteriores y luego ejecuta:');
  console.log('   node test_firebase.js');
} 