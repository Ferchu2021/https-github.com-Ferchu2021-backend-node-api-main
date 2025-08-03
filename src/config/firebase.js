const admin = require('firebase-admin');
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');

// Configuración de Firebase (reemplaza con tus credenciales)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "tu-api-key",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "tu-proyecto.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "tu-proyecto-id",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "tu-proyecto.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.FIREBASE_APP_ID || "tu-app-id"
};

// Inicializar Firebase App
const firebaseApp = initializeApp(firebaseConfig);

// Inicializar Firebase Admin (para el servidor)
let adminApp;
try {
  adminApp = admin.app();
} catch (error) {
  // Si no hay una app admin inicializada, crear una nueva
  adminApp = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID || "tu-proyecto-id",
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "tu-client-email",
      privateKey: process.env.FIREBASE_PRIVATE_KEY ? 
        process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : 
        "tu-private-key"
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL || "https://tu-proyecto.firebaseio.com"
  });
}

// Exportar servicios
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const adminAuth = adminApp.auth();
const adminDb = adminApp.firestore();

module.exports = {
  firebaseApp,
  auth,
  db,
  adminAuth,
  adminDb,
  admin
}; 