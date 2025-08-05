const admin = require('firebase-admin');
require('dotenv').config();

const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

let firebaseApp, adminAuth, adminDb;

// Solo inicializar Firebase si las variables están configuradas
if (FIREBASE_PROJECT_ID && FIREBASE_CLIENT_EMAIL && FIREBASE_PRIVATE_KEY) {
  try {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        privateKey: FIREBASE_PRIVATE_KEY,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        projectId: FIREBASE_PROJECT_ID,
      }),
    });
    
    adminAuth = admin.auth(firebaseApp);
    adminDb = admin.firestore(firebaseApp);
    
    console.log('✅ Firebase configurado correctamente');
  } catch (error) {
    console.error('❌ Error configurando Firebase:', error.message);
    console.log('⚠️ Continuando sin Firebase...');
  }
} else {
  console.log('⚠️ Firebase no configurado - variables de entorno faltantes');
}

module.exports = {
  firebaseApp,
  adminAuth,
  adminDb
};


