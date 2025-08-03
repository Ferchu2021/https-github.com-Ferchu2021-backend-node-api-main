import { Request, Response } from 'express';
import Usuario from '../models/usuario';
import { adminAuth, adminDb } from '../config/firebase';

// Crear un nuevo usuario
export const crearUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, email, contrasena, productos } = req.body;
    
    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      res.status(409).json({ 
        success: false,
        mensaje: 'El email ya está registrado' 
      });
      return;
    }
    
    // Crear usuario en MongoDB
    const nuevoUsuario = new Usuario({ 
      nombre, 
      email, 
      contrasena, 
      productos: productos || '',
      activo: true
    });
    
    await nuevoUsuario.save();
    
    // Crear usuario en Firebase
    try {
      const firebaseUser = await adminAuth.createUser({
        email: email,
        password: contrasena,
        displayName: nombre
      });
      
      // Guardar en Firestore
      await adminDb.collection('usuarios').doc(firebaseUser.uid).set({
        nombre: nombre,
        email: email,
        productos: productos || '',
        mongoId: nuevoUsuario._id.toString()
      });
      
    } catch (firebaseError) {
      console.error('Error en Firebase:', firebaseError);
      // Si falla Firebase, seguimos con MongoDB
    }
    
    // Enviar respuesta sin contraseña
    const usuarioResponse = {
      _id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      productos: nuevoUsuario.productos,
      activo: nuevoUsuario.activo,
      createdAt: nuevoUsuario.createdAt,
      updatedAt: nuevoUsuario.updatedAt
    };
    
    res.status(201).json({
      success: true,
      mensaje: 'Usuario creado exitosamente',
      usuario: usuarioResponse
    });
    
  } catch (error) {
    console.error('Error creando usuario:', error);
    res.status(400).json({ 
      success: false,
      mensaje: 'Error al crear el usuario', 
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

// Obtener todos los usuarios
export const getUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await Usuario.find({ activo: true }).select('-contrasena');
    
    res.status(200).json({
      success: true,
      usuarios
    });
    
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ 
      success: false,
      mensaje: 'Error al obtener usuarios', 
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

// Obtener usuario por ID
export const getUsuarioById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const usuario = await Usuario.findById(id).select('-contrasena');
    
    if (!usuario) {
      res.status(404).json({ 
        success: false,
        mensaje: 'Usuario no encontrado' 
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      usuario
    });
    
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(400).json({ 
      success: false,
      mensaje: 'Error al buscar usuario', 
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

// Obtener usuarios de Firebase
export const getUsuariosFirebase = async (req: Request, res: Response): Promise<void> => {
  try {
    const listUsersResult = await adminAuth.listUsers();
    
    const usuarios = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email,
      nombre: user.displayName,
      createdAt: user.metadata.creationTime
    }));
    
    res.status(200).json({
      success: true,
      usuarios
    });
    
  } catch (error) {
    console.error('Error obteniendo usuarios de Firebase:', error);
    res.status(500).json({ 
      success: false,
      mensaje: 'Error al obtener usuarios de Firebase', 
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
}; 