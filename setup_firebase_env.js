const fs = require('fs');
const path = require('path');

console.log('🔥 Configurando Firebase Admin SDK\n');

// Verificar si existe el archivo .env
const envPath = path.join(__dirname, '.env');
let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  console.log('✅ Archivo .env encontrado');
} else {
  console.log('📝 Creando archivo .env...');
}

// Variables de Firebase que necesitas configurar
const firebaseVars = [
  'FIREBASE_PROJECT_ID=',
  'FIREBASE_PRIVATE_KEY=',
  'FIREBASE_CLIENT_EMAIL='
];

console.log('\n📋 Variables de Firebase que necesitas configurar:\n');

firebaseVars.forEach(varName => {
  if (!envContent.includes(varName.split('=')[0])) {
    console.log(`   ${varName}`);
  } else {
    console.log(`   ✅ ${varName.split('=')[0]} (ya configurada)`);
  }
});

console.log('\n🔧 Pasos para configurar Firebase Admin SDK:\n');

console.log('1️⃣ Ve a Firebase Console:');
console.log('   https://console.firebase.google.com/');
console.log('');

console.log('2️⃣ Selecciona tu proyecto (o crea uno nuevo)');
console.log('');

console.log('3️⃣ Ve a Project Settings (⚙️) > Service Accounts');
console.log('');

console.log('4️⃣ Haz clic en "Generate new private key"');
console.log('');

console.log('5️⃣ Descarga el archivo JSON con las credenciales');
console.log('');

console.log('6️⃣ Abre el archivo JSON y copia los valores:');
console.log('   - project_id → FIREBASE_PROJECT_ID');
console.log('   - private_key → FIREBASE_PRIVATE_KEY');
console.log('   - client_email → FIREBASE_CLIENT_EMAIL');
console.log('');

console.log('7️⃣ Agrega estas variables a tu archivo .env:');
console.log('   FIREBASE_PROJECT_ID=tu-project-id');
console.log('   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"');
console.log('   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@tu-proyecto.iam.gserviceaccount.com');
console.log('');

console.log('⚠️  IMPORTANTE:');
console.log('   - La FIREBASE_PRIVATE_KEY debe estar entre comillas');
console.log('   - Los \\n en la clave privada deben mantenerse');
console.log('   - Nunca compartas estas credenciales');
console.log('');

console.log('8️⃣ Reinicia tu servidor después de configurar las variables');
console.log('   npm start');
console.log('');

console.log('🎯 Una vez configurado, podrás usar:');
console.log('   - POST /api/firebase/register - Registrar usuarios');
console.log('   - POST /api/firebase/login - Autenticar usuarios');
console.log('   - POST /api/firebase/documents - Crear documentos en Firestore');
console.log('   - GET /api/firebase/documents - Obtener documentos');
console.log('   - PUT /api/firebase/documents/:id - Actualizar documentos');
console.log('   - DELETE /api/firebase/documents/:id - Eliminar documentos');
console.log('');

console.log('📚 Documentación adicional:');
console.log('   https://firebase.google.com/docs/admin/setup');
console.log('   https://firebase.google.com/docs/firestore/admin/start'); 