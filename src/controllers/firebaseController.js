const { adminAuth, adminDb } = require('../config/firebase');
const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
const { auth } = require('../config/firebase');

// Firebase Authentication
const firebaseLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Autenticar con Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Obtener token personalizado
        const customToken = await adminAuth.createCustomToken(user.uid);
        
        res.json({
            success: true,
            message: 'Login exitoso con Firebase',
            user: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            },
            customToken
        });
    } catch (error) {
        console.error('Error en Firebase login:', error);
        res.status(401).json({
            success: false,
            message: 'Error de autenticación',
            error: error.message
        });
    }
};

const firebaseRegister = async (req, res) => {
    try {
        const { email, password, displayName } = req.body;
        
        // Crear usuario en Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Actualizar display name
        if (displayName) {
            await user.updateProfile({ displayName });
        }
        
        // Crear documento en Firestore
        await adminDb.collection('users').doc(user.uid).set({
            email: user.email,
            displayName: displayName || '',
            createdAt: new Date(),
            isActive: true
        });
        
        res.json({
            success: true,
            message: 'Usuario registrado exitosamente en Firebase',
            user: {
                uid: user.uid,
                email: user.email,
                displayName: displayName || ''
            }
        });
    } catch (error) {
        console.error('Error en Firebase register:', error);
        res.status(400).json({
            success: false,
            message: 'Error al registrar usuario',
            error: error.message
        });
    }
};

// Firestore Operations
const createDocument = async (req, res) => {
    try {
        const { collection, data } = req.body;
        
        const docRef = await adminDb.collection(collection).add({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        res.json({
            success: true,
            message: 'Documento creado exitosamente',
            documentId: docRef.id
        });
    } catch (error) {
        console.error('Error creando documento:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear documento',
            error: error.message
        });
    }
};

const getDocuments = async (req, res) => {
    try {
        const { collection, limit = 10 } = req.query;
        
        const snapshot = await adminDb.collection(collection)
            .limit(parseInt(limit))
            .get();
        
        const documents = [];
        snapshot.forEach(doc => {
            documents.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        res.json({
            success: true,
            data: documents,
            count: documents.length
        });
    } catch (error) {
        console.error('Error obteniendo documentos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener documentos',
            error: error.message
        });
    }
};

const updateDocument = async (req, res) => {
    try {
        const { collection, documentId } = req.params;
        const updateData = req.body;
        
        await adminDb.collection(collection).doc(documentId).update({
            ...updateData,
            updatedAt: new Date()
        });
        
        res.json({
            success: true,
            message: 'Documento actualizado exitosamente'
        });
    } catch (error) {
        console.error('Error actualizando documento:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar documento',
            error: error.message
        });
    }
};

const deleteDocument = async (req, res) => {
    try {
        const { collection, documentId } = req.params;
        
        await adminDb.collection(collection).doc(documentId).delete();
        
        res.json({
            success: true,
            message: 'Documento eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error eliminando documento:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar documento',
            error: error.message
        });
    }
};

module.exports = {
    firebaseLogin,
    firebaseRegister,
    createDocument,
    getDocuments,
    updateDocument,
    deleteDocument
}; 