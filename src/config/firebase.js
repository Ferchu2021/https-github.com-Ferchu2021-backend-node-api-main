import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();


const {FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL} = process.env;
// Configuración de Firebase 
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({ 
  privateKey: FIREBASE_PRIVATE_KEY,
  clientEmail: FIREBASE_CLIENT_EMAIL,
  projectId: FIREBASE_PROJECT_ID,
  })
});

export default firebaseApp;


