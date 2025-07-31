# 🚀 API Backend Node.js - Documentación Completa

## 📋 Información General

- **URL Base**: `http://localhost:3001`
- **Versión**: 2.0.0
- **Tecnologías**: Node.js, Express, MongoDB, JWT
- **Modo**: Development

## 🔐 Autenticación

La API usa **JWT (JSON Web Tokens)** para autenticación. Incluye el token en el header `Authorization`:

```
Authorization: Bearer TU_TOKEN_AQUI
```

## 📊 Endpoints

### 🔓 **Rutas Públicas**

#### 1. **Health Check**
```http
GET /health
```

**Respuesta:**
```json
{
  "status": "OK",
  "timestamp": "2025-07-31T01:29:00.000Z",
  "uptime": 123.456,
  "memory": {
    "rss": 12345678,
    "heapTotal": 12345678,
    "heapUsed": 12345678,
    "external": 123456
  },
  "environment": "development"
}
```

#### 2. **Información de la API**
```http
GET /
```

**Respuesta:**
```json
{
  "mensaje": "API backend-node-api funcionando correctamente",
  "version": "2.0.0",
  "timestamp": "2025-07-31T01:29:00.000Z",
  "endpoints": {
    "auth": "/api/auth",
    "usuarios": "/api/usuarios",
    "data": "/api/data"
  }
}
```

### 🔐 **Autenticación**

#### 1. **Registro de Usuario**
```http
POST /api/auth/register
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "Password123",
  "rol": "usuario"
}
```

**Respuesta exitosa (201):**
```json
{
  "mensaje": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "rol": "usuario",
    "estado": true,
    "fechaCreacion": "2025-07-31T01:29:00.000Z"
  }
}
```

#### 2. **Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@ejemplo.com",
  "password": "Password123"
}
```

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "rol": "usuario",
    "estado": true,
    "fechaCreacion": "2025-07-31T01:29:00.000Z"
  }
}
```

#### 3. **Verificar Token**
```http
GET /api/auth/verify
Authorization: Bearer TU_TOKEN_AQUI
```

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Token válido",
  "usuario": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "rol": "usuario",
    "estado": true,
    "fechaCreacion": "2025-07-31T01:29:00.000Z"
  }
}
```

#### 4. **Renovar Token**
```http
POST /api/auth/refresh
Authorization: Bearer TU_TOKEN_AQUI
```

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Token renovado",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 👥 **Gestión de Usuarios**

#### 1. **Obtener Todos los Usuarios (con paginación)**
```http
GET /api/usuarios?page=1&limit=10&search=juan&rol=usuario&estado=true
```

**Parámetros de consulta:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Elementos por página (default: 10, max: 100)
- `search` (opcional): Búsqueda en nombre y email
- `rol` (opcional): Filtrar por rol (admin/usuario)
- `estado` (opcional): Filtrar por estado (true/false)

**Respuesta exitosa (200):**
```json
{
  "usuarios": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "nombre": "Juan Pérez",
      "email": "juan@ejemplo.com",
      "rol": "usuario",
      "estado": true,
      "fechaCreacion": "2025-07-31T01:29:00.000Z"
    }
  ],
  "paginacion": {
    "pagina": 1,
    "limite": 10,
    "total": 1,
    "totalPaginas": 1,
    "tieneSiguiente": false,
    "tieneAnterior": false
  }
}
```

#### 2. **Crear Usuario (Solo Admin)**
```http
POST /api/usuarios
Authorization: Bearer ADMIN_TOKEN_AQUI
Content-Type: application/json

{
  "nombre": "María García",
  "email": "maria@ejemplo.com",
  "password": "Password123",
  "rol": "usuario"
}
```

#### 3. **Obtener Usuario por ID**
```http
GET /api/usuarios/64f8a1b2c3d4e5f6a7b8c9d0
```

#### 4. **Actualizar Usuario**
```http
PUT /api/usuarios/64f8a1b2c3d4e5f6a7b8c9d0
Authorization: Bearer TU_TOKEN_AQUI
Content-Type: application/json

{
  "nombre": "Juan Carlos Pérez",
  "email": "juancarlos@ejemplo.com",
  "password": "NuevaPassword123",
  "rol": "admin",
  "estado": true
}
```

#### 5. **Eliminar Usuario (Solo Admin)**
```http
DELETE /api/usuarios/64f8a1b2c3d4e5f6a7b8c9d0
Authorization: Bearer ADMIN_TOKEN_AQUI
```

#### 6. **Obtener Mi Perfil**
```http
GET /api/usuarios/perfil/me
Authorization: Bearer TU_TOKEN_AQUI
```

#### 7. **Actualizar Mi Perfil**
```http
PUT /api/usuarios/perfil/me
Authorization: Bearer TU_TOKEN_AQUI
Content-Type: application/json

{
  "nombre": "Juan Carlos Pérez",
  "email": "juancarlos@ejemplo.com",
  "password": "NuevaPassword123"
}
```

### 📊 **Datos (Data)**

#### 1. **Obtener Datos Públicos**
```http
GET /api/data
```

#### 2. **Obtener Datos Privados**
```http
GET /api/data/private
Authorization: Bearer TU_TOKEN_AQUI
```

#### 3. **Crear Dato**
```http
POST /api/data
Authorization: Bearer TU_TOKEN_AQUI
Content-Type: application/json

{
  "titulo": "Mi dato",
  "contenido": "Contenido del dato"
}
```

#### 4. **Actualizar Dato**
```http
PUT /api/data/64f8a1b2c3d4e5f6a7b8c9d0
Authorization: Bearer TU_TOKEN_AQUI
Content-Type: application/json

{
  "titulo": "Dato actualizado",
  "contenido": "Contenido actualizado"
}
```

#### 5. **Eliminar Dato**
```http
DELETE /api/data/64f8a1b2c3d4e5f6a7b8c9d0
Authorization: Bearer TU_TOKEN_AQUI
```

## ⚠️ **Códigos de Error**

### **400 - Bad Request**
```json
{
  "error": "Datos de entrada inválidos",
  "details": [
    {
      "field": "email",
      "message": "Debe ser un email válido",
      "value": "email_invalido"
    }
  ]
}
```

### **401 - Unauthorized**
```json
{
  "error": "Acceso denegado. Token no proporcionado."
}
```

### **403 - Forbidden**
```json
{
  "error": "No tienes permisos para realizar esta acción."
}
```

### **404 - Not Found**
```json
{
  "error": "Ruta no encontrada",
  "path": "/api/ruta-inexistente",
  "method": "GET"
}
```

### **409 - Conflict**
```json
{
  "error": "El email ya está registrado"
}
```

### **429 - Too Many Requests**
```json
{
  "error": "Demasiadas solicitudes desde esta IP, intenta de nuevo en 15 minutos"
}
```

### **500 - Internal Server Error**
```json
{
  "error": "Error interno del servidor"
}
```

## 🔒 **Validaciones**

### **Usuario**
- `nombre`: 2-50 caracteres, solo letras y espacios
- `email`: Email válido y único
- `password`: Mínimo 6 caracteres, al menos 1 mayúscula, 1 minúscula y 1 número
- `rol`: "admin" o "usuario" (default: "usuario")

### **Paginación**
- `page`: Número mayor a 0
- `limit`: Número entre 1 y 100

### **Búsqueda**
- `search`: Mínimo 2 caracteres
- `estado`: true o false

## 🚦 **Rate Limiting**

- **General**: 100 requests por 15 minutos
- **Autenticación**: 5 intentos por 15 minutos
- **Creación de usuarios**: 3 usuarios por hora

## 📝 **Logs**

Los logs se guardan en:
- `src/logs/error.log` - Solo errores
- `src/logs/combined.log` - Todos los logs

## 🛠️ **Variables de Entorno**

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/backend-node-api

# Servidor
PORT=3001
NODE_ENV=development

# JWT
JWT_SECRET=tu_secreto_jwt_super_seguro_aqui

# Frontend
FRONTEND_URL=http://localhost:3000

# Logs
LOG_LEVEL=info
```

## 🧪 **Ejemplos de Uso con cURL**

### **Registro**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "password": "Password123"
  }'
```

### **Login**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@ejemplo.com",
    "password": "Password123"
  }'
```

### **Obtener usuarios con token**
```bash
curl -X GET http://localhost:3001/api/usuarios \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### **Crear usuario (admin)**
```bash
curl -X POST http://localhost:3001/api/usuarios \
  -H "Authorization: Bearer ADMIN_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María García",
    "email": "maria@ejemplo.com",
    "password": "Password123",
    "rol": "usuario"
  }'
```

## 🎯 **Próximos Pasos**

1. **Probar todos los endpoints** con Postman o similar
2. **Crear un usuario admin** para probar funcionalidades avanzadas
3. **Configurar para producción**
4. **Agregar tests automatizados**
5. **Implementar subida de archivos**
6. **Agregar notificaciones por email**

---

**¡Tu API está lista para usar! 🚀** 