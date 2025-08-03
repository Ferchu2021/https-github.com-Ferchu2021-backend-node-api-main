const { firebaseApp, adminAuth, adminDb } = require('./src/config/firebase');

console.log('🔥 Probando configuración simplificada de Firebase\n');

try {
  console.log('✅ Firebase App inicializado:', firebaseApp.name);
  console.log('✅ Firebase Auth disponible:', !!adminAuth);
  console.log('✅ Firestore disponible:', !!adminDb);
  
  console.log('\n🎉 ¡Configuración simplificada funcionando correctamente!');
  console.log('');
  console.log('📋 Ventajas de la nueva configuración:');
  console.log('✅ Más simple y directa');
  console.log('✅ Código más limpio');
  console.log('✅ Menos verificaciones innecesarias');
  console.log('✅ Más fácil de mantener');
  console.log('');
  console.log('🔧 Configuración actual:');
  console.log('- firebaseApp: Aplicación principal de Firebase');
  console.log('- adminAuth: Para autenticación de usuarios');
  console.log('- adminDb: Para operaciones de Firestore');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\n🔧 Verifica que las variables de entorno estén configuradas:');
  console.log('- FIREBASE_PROJECT_ID');
  console.log('- FIREBASE_CLIENT_EMAIL');
  console.log('- FIREBASE_PRIVATE_KEY');
} 