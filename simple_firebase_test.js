require('dotenv').config();

console.log('🔥 Probando Firebase...\n');

// Verificar variables
const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

console.log('📋 Variables de entorno:');
console.log(`   Project ID: ${projectId ? '✅' : '❌'}`);
console.log(`   Client Email: ${clientEmail ? '✅' : '❌'}`);
console.log(`   Private Key: ${privateKey ? '✅' : '❌'}`);
console.log('');

if (!projectId || !clientEmail || !privateKey) {
  console.log('❌ Faltan variables de entorno');
  process.exit(1);
}

// Probar inicialización
try {
  const admin = require('firebase-admin');
  
  console.log('🚀 Inicializando Firebase...');
  
  const app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: projectId,
      privateKey: privateKey.replace(/\\n/g, '\n'),
      clientEmail: clientEmail
    })
  });
  
  console.log('✅ Firebase inicializado correctamente');
  console.log(`   Proyecto: ${projectId}`);
  
  // Probar auth
  const auth = admin.auth(app);
  console.log('✅ Firebase Auth disponible');
  
  // Probar firestore
  const db = admin.firestore(app);
  console.log('✅ Firestore disponible');
  
  console.log('\n🎉 ¡Firebase está funcionando correctamente!');
  
} catch (error) {
  console.log('❌ Error:', error.message);
  console.log('\n🔧 Posibles soluciones:');
  console.log('   1. Verifica que el proyecto exista en Firebase Console');
  console.log('   2. Verifica que las credenciales sean correctas');
  console.log('   3. Habilita Authentication y Firestore en Firebase Console');
} 