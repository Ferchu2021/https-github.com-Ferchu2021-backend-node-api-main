# 🔥 Firebase Integration - Documentación Completa

## 📋 **Configuración Inicial**

### **1. Crear proyecto en Firebase Console**
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a "Project Settings" (ícono de engranaje)
4. Haz clic en "Add app" y selecciona "Web"
5. Copia la configuración que te proporciona Firebase

### **2. Configurar variables de entorno**
Agrega estas variables a tu archivo `.env`:

```env
# Firebase Configuration
FIREBASE_API_KEY=tu-api-key
FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu-proyecto-id
FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=tu-app-id

# Firebase Admin (Service Account)
FIREBASE_CLIENT_EMAIL=tu-service-account-email
FIREBASE_PRIVATE_KEY=tu-private-key
FIREBASE_DATABASE_URL=https://tu-proyecto.firebaseio.com
```

### **3. Configurar servicios de Firebase**
1. **Authentication**: Ve a "Authentication" > "Sign-in method" > Habilita "Email/Password"
2. **Firestore**: Ve a "Firestore Database" > "Create database" > Selecciona modo de prueba
3. **Service Account**: Ve a "Project Settings" > "Service accounts" > "Generate new private key"

---

## 🔐 **Firebase Authentication**

### **Registro de Usuario**
```http
POST /api/firebase/auth/register
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "password123",
  "displayName": "Nombre Usuario"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente en Firebase",
  "user": {
    "uid": "abc123...",
    "email": "usuario@ejemplo.com",
    "displayName": "Nombre Usuario"
  }
}
```

### **Login de Usuario**
```http
POST /api/firebase/auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Login exitoso con Firebase",
  "user": {
    "uid": "abc123...",
    "email": "usuario@ejemplo.com",
    "displayName": "Nombre Usuario"
  },
  "customToken": "eyJhbGciOiJSUzI1NiIs..."
}
```

---

## 🗄️ **Firestore Database**

### **Crear Documento**
```http
POST /api/firebase/firestore/usuarios
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "edad": 25,
  "activo": true
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Documento creado exitosamente",
  "documentId": "abc123def456"
}
```

### **Obtener Documentos**
```http
GET /api/firebase/firestore/usuarios?limit=10
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "abc123def456",
      "nombre": "Juan Pérez",
      "email": "juan@ejemplo.com",
      "edad": 25,
      "activo": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

### **Actualizar Documento**
```http
PUT /api/firebase/firestore/usuarios/abc123def456
Content-Type: application/json

{
  "edad": 26,
  "activo": false
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Documento actualizado exitosamente"
}
```

### **Eliminar Documento**
```http
DELETE /api/firebase/firestore/usuarios/abc123def456
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Documento eliminado exitosamente"
}
```

---

## 🧪 **Pruebas con Postman**

### **Collection de Postman para Firebase**

#### **1. Firebase Auth - Register**
```
Method: POST
URL: {{base_url}}/api/firebase/auth/register
Headers: Content-Type: application/json
Body:
{
  "email": "test@firebase.com",
  "password": "test123",
  "displayName": "Test User"
}
```

#### **2. Firebase Auth - Login**
```
Method: POST
URL: {{base_url}}/api/firebase/auth/login
Headers: Content-Type: application/json
Body:
{
  "email": "test@firebase.com",
  "password": "test123"
}
```

#### **3. Firestore - Create Document**
```
Method: POST
URL: {{base_url}}/api/firebase/firestore/productos
Headers: Content-Type: application/json
Body:
{
  "nombre": "Laptop Gaming",
  "precio": 999.99,
  "categoria": "Electrónicos",
  "stock": 10
}
```

#### **4. Firestore - Get Documents**
```
Method: GET
URL: {{base_url}}/api/firebase/firestore/productos?limit=5
```

#### **5. Firestore - Update Document**
```
Method: PUT
URL: {{base_url}}/api/firebase/firestore/productos/{{document_id}}
Headers: Content-Type: application/json
Body:
{
  "precio": 899.99,
  "stock": 8
}
```

#### **6. Firestore - Delete Document**
```
Method: DELETE
URL: {{base_url}}/api/firebase/firestore/productos/{{document_id}}
```

---

## 🔧 **Scripts de Automatización**

### **Script para guardar document_id automáticamente**
```javascript
// En la pestaña "Tests" de Postman
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.documentId) {
        pm.environment.set("document_id", response.documentId);
        console.log("Document ID guardado:", response.documentId);
    }
}
```

### **Script para verificar respuestas de Firebase**
```javascript
// En la pestaña "Tests" de Postman
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has success property", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('success');
    pm.expect(response.success).to.be.true;
});

pm.test("Response time is less than 2000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});
```

---

## 🚨 **Códigos de Error Comunes**

- **400 Bad Request**: Datos de entrada inválidos
- **401 Unauthorized**: Credenciales incorrectas
- **403 Forbidden**: Permisos insuficientes
- **404 Not Found**: Documento o colección no encontrada
- **500 Internal Server Error**: Error interno de Firebase

---

## 💡 **Mejores Prácticas**

1. **Seguridad**: Siempre valida los datos de entrada
2. **Estructura**: Organiza las colecciones de manera lógica
3. **Índices**: Crea índices para consultas frecuentes
4. **Reglas**: Configura reglas de seguridad en Firestore
5. **Monitoreo**: Usa Firebase Analytics para monitorear el uso

---

## 🔄 **Migración desde MongoDB**

Si quieres migrar datos desde MongoDB a Firebase:

1. **Exportar datos de MongoDB**:
   ```bash
   mongoexport --db tu-db --collection usuarios --out usuarios.json
   ```

2. **Convertir formato**:
   ```javascript
   const data = require('./usuarios.json');
   // Convertir a formato compatible con Firestore
   ```

3. **Importar a Firebase**:
   ```javascript
   // Usar el endpoint POST /api/firebase/firestore/usuarios
   ```

---

## 📊 **Monitoreo y Analytics**

### **Firebase Analytics**
- Ve a "Analytics" en Firebase Console
- Monitorea eventos personalizados
- Analiza el comportamiento de usuarios

### **Firebase Performance**
- Monitorea el rendimiento de la API
- Identifica cuellos de botella
- Optimiza consultas lentas

---

¡Con esta configuración tienes Firebase completamente integrado en tu API! 🎉 