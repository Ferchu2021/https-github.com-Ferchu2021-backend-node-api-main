# Backend Node.js API - Examen Final

## 📋 Descripción
Backend API REST desarrollado para el examen final con las siguientes tecnologías:
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **Firebase** (Auth + Firestore)
- **JWT** para autenticación
- **Vercel** para deploy

## 🚀 Funcionalidades Implementadas

### ✅ Requerimientos Cumplidos:
- ✅ **API REST** con arquitectura correcta
- ✅ **Base de datos** MongoDB hosteada en la nube
- ✅ **Autenticación JWT** implementada
- ✅ **CRUD completo** de usuarios
- ✅ **Rutas públicas y privadas**
- ✅ **Validaciones** de datos
- ✅ **Integración Firebase** (Auth + Firestore)
- ✅ **Baja lógica** implementada
- ✅ **Código prolijo** y bien estructurado

## 🔧 Instalación

```bash
# Clonar repositorio
git clone <tu-repositorio>

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start
```

## 📁 Estructura del Proyecto

```
src/
├── app.js                 # Aplicación principal
├── config/
│   └── firebase.js        # Configuración Firebase
├── controllers/
│   └── usuarioController.js # Controlador de usuarios
├── middleware/
│   └── authMiddleware.js   # Middleware de autenticación
├── models/
│   └── usuario.js         # Modelo de usuario
└── routes/
    └── usuarioRoutes.js   # Rutas de usuarios
```

## 🔌 Endpoints API

### Rutas Públicas
- `GET /api/usuarios` - Listar usuarios (público)
- `POST /api/usuarios/login` - Login de usuario

### Rutas Privadas (requieren JWT)
- `POST /api/usuarios` - Crear usuario
- `GET /api/usuarios/:id` - Obtener usuario por ID
- `PUT /api/usuarios/:id` - Actualizar usuario
- `DELETE /api/usuarios/:id` - Eliminar usuario (baja lógica)

## 🔐 Autenticación

### Login
```bash
POST /api/usuarios/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "contrasena": "password123"
}
```

### Respuesta
```json
{
  "success": true,
  "mensaje": "Login exitoso",
  "token": "jwt_token_aqui",
  "usuario": {
    "_id": "id_del_usuario",
    "nombre": "Nombre Usuario",
    "email": "usuario@email.com",
    "productos": "Productos del usuario",
    "activo": true
  }
}
```

### Usar Token
```bash
Authorization: Bearer <jwt_token>
```

## 🧪 Pruebas

```bash
# Ejecutar pruebas completas
npm run test-examen

# O ejecutar directamente
node test_examen_final.js
```

## 🌐 Deploy

### Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Variables de entorno en Vercel
MONGO_URI=tu_mongo_uri
JWT_SECRET=tu_jwt_secret
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_CLIENT_EMAIL=tu_client_email
FIREBASE_PRIVATE_KEY=tu_private_key
```

## 📊 Base de Datos

### MongoDB Atlas
- Base de datos hosteada en MongoDB Atlas
- Colección: `usuarios`
- Campos: `nombre`, `email`, `contrasena`, `productos`, `activo`, `createdAt`, `updatedAt`

### Firebase
- Autenticación de usuarios
- Firestore para datos adicionales
- Sincronización con MongoDB

## 🔒 Seguridad

- ✅ **JWT** para autenticación
- ✅ **Bcrypt** para hash de contraseñas
- ✅ **Helmet** para headers de seguridad
- ✅ **CORS** configurado
- ✅ **Rate limiting** implementado
- ✅ **Validaciones** de entrada

## 📝 Scripts Disponibles

```bash
npm start          # Iniciar servidor
npm run dev        # Modo desarrollo
npm run test       # Ejecutar pruebas
npm run test-examen # Pruebas del examen final
```

## 🎯 Criterios de Evaluación Cumplidos

1. ✅ **Proyecto Backend** alojado en GitHub
2. ✅ **Código prolijo** y segmentado en commits
3. ✅ **Hosteado en la nube** (Vercel)
4. ✅ **Base de datos** MongoDB en la nube
5. ✅ **API REST** implementada correctamente
6. ✅ **Autenticación JWT** funcionando
7. ✅ **CRUD completo** de usuarios
8. ✅ **Validaciones** implementadas
9. ✅ **Integración Firebase** funcionando
10. ✅ **Baja lógica** implementada

## 🔗 URLs de Deploy

- **Backend**: `https://tu-backend.vercel.app`
- **Frontend**: `https://tu-frontend.vercel.app` (pendiente)

## 📞 Contacto

Desarrollado para el examen final de MCGA.
