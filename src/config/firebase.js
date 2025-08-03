const admin = require('firebase-admin');
require('dotenv').config();

// Verificar que las variables de entorno estén configuradas
const {
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL
} = process.env;

// Verificar que las credenciales estén disponibles
if (!FIREBASE_PROJECT_ID || !FIREBASE_PRIVATE_KEY || !FIREBASE_CLIENT_EMAIL) {
  console.warn('⚠️  Firebase Admin SDK no configurado completamente');
  console.warn('   Variables de entorno faltantes:');
  console.warn('   - FIREBASE_PROJECT_ID');
  console.warn('   - FIREBASE_PRIVATE_KEY');
  console.warn('   - FIREBASE_CLIENT_EMAIL');
  console.warn('   Los endpoints de Firebase no funcionarán correctamente');
}

// Configuración de Firebase Admin SDK
let firebaseApp;
let adminAuth;
let adminDb;

try {
  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      privateKey: FIREBASE_PRIVATE_KEY ? FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
      clientEmail: FIREBASE_CLIENT_EMAIL
    })
  });

  adminAuth = admin.auth(firebaseApp);
  adminDb = admin.firestore(firebaseApp);

  console.log('✅ Firebase Admin SDK inicializado correctamente');
} catch (error) {
  console.error('❌ Error inicializando Firebase Admin SDK:', error.message);
  console.log('📝 Para configurar Firebase Admin SDK:');
  console.log('   1. Ve a Firebase Console > Project Settings > Service Accounts');
  console.log('   2. Genera una nueva clave privada');
  console.log('   3. Configura las variables de entorno en .env');
}

module.exports = {
  firebaseApp,
  adminAuth,
  adminDb,
  admin
};


