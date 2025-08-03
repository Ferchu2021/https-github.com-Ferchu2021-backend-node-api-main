const { adminAuth, adminDb } = require('../config/firebase');

// Firebase Authentication
const firebaseLogin = async (req, res) => {
    try {
        // Verificar que Firebase esté configurado
        if (!adminAuth) {
            return res.status(500).json({
                success: false,
                message: 'Firebase Admin SDK no está configurado',
                error: 'Configuración de Firebase faltante'
            });
        }

        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email y contraseña son requeridos'
            });
        }

        // Para Firebase Admin SDK, necesitamos verificar el token del cliente
        // Por ahora, simulamos una respuesta exitosa
        res.json({
            success: true,
            message: 'Firebase Admin SDK configurado correctamente',
            note: 'Para autenticación completa, necesitas enviar tokens desde el frontend',
            user: {
                email: email,
                authenticated: true
            }
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
        // Verificar que Firebase esté configurado
        if (!adminAuth || !adminDb) {
            return res.status(500).json({
                success: false,
                message: 'Firebase Admin SDK no está configurado completamente',
                error: 'Configuración de Firebase faltante'
            });
        }

        const { email, password, displayName } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email y contraseña son requeridos'
            });
        }

        // Crear usuario con Firebase Admin SDK
        const userRecord = await adminAuth.createUser({
            email: email,
            password: password,
            displayName: displayName || ''
        });

        // Crear documento en Firestore
        await adminDb.collection('users').doc(userRecord.uid).set({
            email: userRecord.email,
            displayName: displayName || '',
            createdAt: new Date(),
            isActive: true
        });

        res.json({
            success: true,
            message: 'Usuario registrado exitosamente en Firebase',
            user: {
                uid: userRecord.uid,
                email: userRecord.email,
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
        if (!adminDb) {
            return res.status(500).json({
                success: false,
                message: 'Firebase Admin SDK no está configurado'
            });
        }

        const { collection, data } = req.body;
        
        if (!collection || !data) {
            return res.status(400).json({
                success: false,
                message: 'Colección y datos son requeridos'
            });
        }

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
        if (!adminDb) {
            return res.status(500).json({
                success: false,
                message: 'Firebase Admin SDK no está configurado'
            });
        }

        const { collection, limit = 10 } = req.query;
        
        if (!collection) {
            return res.status(400).json({
                success: false,
                message: 'Nombre de colección es requerido'
            });
        }

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
        if (!adminDb) {
            return res.status(500).json({
                success: false,
                message: 'Firebase Admin SDK no está configurado'
            });
        }

        const { collection, documentId } = req.params;
        const updateData = req.body;

        if (!collection || !documentId) {
            return res.status(400).json({
                success: false,
                message: 'Colección e ID del documento son requeridos'
            });
        }

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
        if (!adminDb) {
            return res.status(500).json({
                success: false,
                message: 'Firebase Admin SDK no está configurado'
            });
        }

        const { collection, documentId } = req.params;

        if (!collection || !documentId) {
            return res.status(400).json({
                success: false,
                message: 'Colección e ID del documento son requeridos'
            });
        }

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