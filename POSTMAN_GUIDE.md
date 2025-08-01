# 🚀 Guía Completa: Postman + Backend Node.js

## 📋 **Configuración Inicial**

### **1. Crear una nueva Collection en Postman**
- Abre Postman
- Haz clic en "New" → "Collection"
- Nombra la collection: `Backend Node.js API`
- Descripción: `API REST con MongoDB Atlas`

### **2. Configurar Variables de Entorno**
- Haz clic en "Environments" → "New"
- Nombre: `Backend Local`
- Variables:
  - `base_url`: `http://localhost:3001`
  - `token`: (dejarlo vacío por ahora)

---

## 🔐 **ENDPOINTS DE AUTENTICACIÓN**

### **1. Login (POST)**
```
URL: {{base_url}}/api/auth/login
Method: POST
Headers: 
  Content-Type: application/json
Body (raw JSON):
{
  "email": "admin@ejemplo.com",
  "password": "Admin123"
}
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "688c27fb33b79eade19bce22",
    "nombre": "Administrador",
    "email": "admin@ejemplo.com",
    "rol": "admin"
  }
}
```

### **2. Registro (POST)**
```
URL: {{base_url}}/api/auth/register
Method: POST
Headers: 
  Content-Type: application/json
Body (raw JSON):
{
  "nombre": "Usuario Test",
  "email": "test@ejemplo.com",
  "password": "Test123"
}
```

### **3. Verificar Token (GET)**
```
URL: {{base_url}}/api/auth/verify
Method: GET
Headers: 
  Authorization: Bearer {{token}}
```

---

## 👥 **ENDPOINTS DE USUARIOS**

### **1. Obtener Perfil (GET)**
```
URL: {{base_url}}/api/usuarios/perfil/me
Method: GET
Headers: 
  Authorization: Bearer {{token}}
```

### **2. Listar Usuarios (GET)**
```
URL: {{base_url}}/api/usuarios
Method: GET
Headers: 
  Authorization: Bearer {{token}}
```

**Con paginación:**
```
URL: {{base_url}}/api/usuarios?page=1&limit=10&search=admin
```

### **3. Obtener Usuario por ID (GET)**
```
URL: {{base_url}}/api/usuarios/{{user_id}}
Method: GET
Headers: 
  Authorization: Bearer {{token}}
```

### **4. Actualizar Usuario (PUT)**
```
URL: {{base_url}}/api/usuarios/{{user_id}}
Method: PUT
Headers: 
  Authorization: Bearer {{token}}
  Content-Type: application/json
Body (raw JSON):
{
  "nombre": "Nuevo Nombre",
  "email": "nuevo@email.com"
}
```

### **5. Eliminar Usuario (DELETE)**
```
URL: {{base_url}}/api/usuarios/{{user_id}}
Method: DELETE
Headers: 
  Authorization: Bearer {{token}}
```

---

## 📊 **ENDPOINTS DE DATOS**

### **1. Obtener Datos (GET)**
```
URL: {{base_url}}/api/data
Method: GET
```

### **2. Crear Dato (POST)**
```
URL: {{base_url}}/api/data
Method: POST
Headers: 
  Authorization: Bearer {{token}}
  Content-Type: application/json
Body (raw JSON):
{
  "titulo": "Nuevo Dato",
  "descripcion": "Descripción del dato",
  "categoria": "test"
}
```

---

## 🔍 **ENDPOINTS DE SISTEMA**

### **1. Health Check (GET)**
```
URL: {{base_url}}/health
Method: GET
```

**Respuesta esperada:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": "123.45",
  "database": "connected"
}
```

---

## 🧪 **SCRIPT DE AUTOMATIZACIÓN**

### **Script para guardar token automáticamente (en Tests tab):**
```javascript
// Para endpoints de login
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.token) {
        pm.environment.set("token", response.token);
        console.log("Token guardado automáticamente");
    }
}
```

### **Script para verificar respuestas (en Tests tab):**
```javascript
// Verificar que la respuesta sea exitosa
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has success property", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('success');
});

pm.test("Response time is less than 1000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});
```

---

## 📝 **FLUJO DE PRUEBAS RECOMENDADO**

### **Paso 1: Verificar que el servidor esté funcionando**
1. Ejecutar `Health Check`
2. Verificar que responda con status 200

### **Paso 2: Autenticación**
1. Ejecutar `Login` con credenciales admin
2. Verificar que se obtenga el token
3. El token se guardará automáticamente en las variables

### **Paso 3: Probar endpoints protegidos**
1. `Obtener Perfil` - Verificar que funcione con el token
2. `Listar Usuarios` - Verificar paginación y búsqueda
3. `Obtener Usuario por ID` - Probar con un ID válido

### **Paso 4: Probar endpoints públicos**
1. `Obtener Datos` - Verificar que no requiera autenticación

### **Paso 5: Probar validaciones**
1. Login con credenciales incorrectas
2. Registro con datos inválidos
3. Acceso a endpoints protegidos sin token

---

## 🚨 **CÓDIGOS DE ERROR COMUNES**

- **401 Unauthorized**: Token inválido o expirado
- **403 Forbidden**: No tienes permisos para esta acción
- **404 Not Found**: Endpoint o recurso no encontrado
- **422 Validation Error**: Datos de entrada inválidos
- **429 Too Many Requests**: Límite de rate limiting alcanzado
- **500 Internal Server Error**: Error interno del servidor

---

## 💡 **CONSEJOS ÚTILES**

1. **Usa variables de entorno** para no repetir URLs
2. **Guarda el token automáticamente** con scripts
3. **Verifica respuestas** con tests automáticos
4. **Usa la función de búsqueda** para encontrar endpoints rápidamente
5. **Exporta tu collection** para compartir con otros desarrolladores

---

## 🔧 **SOLUCIÓN DE PROBLEMAS**

### **El servidor no responde:**
1. Verifica que esté corriendo: `npm start`
2. Verifica el puerto: `http://localhost:3001`
3. Revisa los logs del servidor

### **Error de autenticación:**
1. Verifica que el token esté en las variables
2. Asegúrate de que el token no haya expirado
3. Haz login nuevamente para obtener un nuevo token

### **Error de validación:**
1. Revisa el formato de los datos enviados
2. Verifica que todos los campos requeridos estén presentes
3. Revisa los tipos de datos (string, number, etc.)

---

¡Con esta guía podrás probar completamente tu API con Postman! 🎉 