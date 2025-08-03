const express = require('express');
const router = express.Router();
const {
    firebaseLogin,
    firebaseRegister,
    createDocument,
    getDocuments,
    updateDocument,
    deleteDocument
} = require('../controllers/firebaseController');

// Firebase Authentication Routes
router.post('/auth/login', firebaseLogin);
router.post('/auth/register', firebaseRegister);

// Firestore Routes
router.post('/firestore/:collection', createDocument);
router.get('/firestore/:collection', getDocuments);
router.put('/firestore/:collection/:documentId', updateDocument);
router.delete('/firestore/:collection/:documentId', deleteDocument);

module.exports = router; 