const admin = require('firebase-admin');
require('dotenv').config();

const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: FIREBASE_PRIVATE_KEY,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    projectId: FIREBASE_PROJECT_ID,
  }),
});

const adminAuth = admin.auth(firebaseApp);
const adminDb = admin.firestore(firebaseApp);

module.exports = {
  firebaseApp,
  adminAuth,
  adminDb
};


