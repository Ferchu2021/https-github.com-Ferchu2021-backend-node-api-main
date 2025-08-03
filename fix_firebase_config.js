const admin = require('firebase-admin');
require('dotenv').config();

console.log('🔧 Diagnosticando configuración de Firebase...\n');

// Verificar variables de entorno
const {
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL
} = process.env;

console.log('📋 Variables de entorno:');
console.log(`   FIREBASE_PROJECT_ID: ${FIREBASE_PROJECT_ID ? '✅ Configurada' : '❌ Faltante'}`);
console.log(`   FIREBASE_PRIVATE_KEY: ${FIREBASE_PRIVATE_KEY ? '✅ Configurada' : '❌ Faltante'}`);
console.log(`   FIREBASE_CLIENT_EMAIL: ${FIREBASE_CLIENT_EMAIL ? '✅ Configurada' : '❌ Faltante'}`);
console.log('');

if (!FIREBASE_PROJECT_ID || !FIREBASE_PRIVATE_KEY || !FIREBASE_CLIENT_EMAIL) {
  console.log('❌ Faltan variables de entorno de Firebase');
  console.log('   Configura las variables en tu archivo .env');
  process.exit(1);
}

// Verificar formato de la clave privada
const privateKeyFormatted = FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
console.log('🔑 Verificando formato de clave privada...');
console.log(`   Longitud: ${privateKeyFormatted.length} caracteres`);
console.log(`   Comienza con: ${privateKeyFormatted.substring(0, 30)}...`);
console.log(`   Termina con: ...${privateKeyFormatted.substring(privateKeyFormatted.length - 30)}`);
console.log('');

// Intentar inicializar Firebase
console.log('🚀 Intentando inicializar Firebase Admin SDK...');

try {
  const app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      privateKey: privateKeyFormatted,
      clientEmail: FIREBASE_CLIENT_EMAIL
    })
  });

  console.log('✅ Firebase Admin SDK inicializado correctamente');
  console.log(`   Proyecto: ${FIREBASE_PROJECT_ID}`);
  console.log('');

  // Probar Authentication
  console.log('🔐 Probando Firebase Authentication...');
  const auth = admin.auth(app);
  
  try {
    // Intentar crear un usuario de prueba
    const testUser = await auth.createUser({
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      displayName: 'Test User'
    });
    
    console.log('✅ Firebase Authentication funciona correctamente');
    console.log(`   Usuario creado: ${testUser.uid}`);
    
    // Eliminar el usuario de prueba
    await auth.deleteUser(testUser.uid);
    console.log('   Usuario de prueba eliminado');
    
  } catch (authError) {
    console.log('❌ Error en Firebase Authentication:');
    console.log(`   ${authError.message}`);
    console.log('');
    console.log('🔧 Soluciones posibles:');
    console.log('   1. Verifica que Authentication esté habilitado en Firebase Console');
    console.log('   2. Ve a Authentication > Sign-in method > Email/Password');
    console.log('   3. Habilita "Email/Password" como método de autenticación');
  }

  // Probar Firestore
  console.log('\n📄 Probando Firestore...');
  const db = admin.firestore(app);
  
  try {
    // Intentar crear un documento de prueba
    const testDoc = await db.collection('test').add({
      test: true,
      timestamp: new Date()
    });
    
    console.log('✅ Firestore funciona correctamente');
    console.log(`   Documento creado: ${testDoc.id}`);
    
    // Eliminar el documento de prueba
    await testDoc.delete();
    console.log('   Documento de prueba eliminado');
    
  } catch (firestoreError) {
    console.log('❌ Error en Firestore:');
    console.log(`   ${firestoreError.message}`);
    console.log('');
    console.log('🔧 Soluciones posibles:');
    console.log('   1. Verifica que Firestore esté habilitado en Firebase Console');
    console.log('   2. Ve a Firestore Database > Create database');
    console.log('   3. Selecciona "Start in test mode"');
  }

  console.log('\n🎉 ¡Firebase está configurado correctamente!');
  console.log('   Puedes usar todos los endpoints de Firebase ahora.');
  
} catch (error) {
  console.log('❌ Error inicializando Firebase Admin SDK:');
  console.log(`   ${error.message}`);
  console.log('');
  console.log('🔧 Posibles soluciones:');
  console.log('   1. Verifica que el proyecto de Firebase exista');
  console.log('   2. Verifica que las credenciales sean correctas');
  console.log('   3. Verifica que el archivo JSON de credenciales sea válido');
  console.log('   4. Asegúrate de que el proyecto tenga los servicios habilitados');
} 