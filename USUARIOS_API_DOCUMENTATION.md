# 👥 API de Usuarios - Documentación Completa

## 📋 **Endpoints Disponibles**

### **🔍 Obtener Usuarios**
```http
GET /api/usuarios
```

**Parámetros de consulta:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Usuarios por página (default: 10)
- `search` (opcional): Búsqueda por nombre o email

**Ejemplo:**
```http
GET /api/usuarios?page=1&limit=5&search=Juan
```

**Respuesta:**
```json
{
  "success": true,
  "usuarios": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "productos": "Laptop, Mouse",
      "activo": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "paginacion": {
    "pagina": 1,
    "limite": 5,
    "total": 25,
    "totalPaginas": 5,
    "tieneSiguiente": true,
    "tieneAnterior": false
  }
}
```

---

### **➕ Crear Usuario**
```http
POST /api/usuarios
```

**Body:**
```json
{
  "nombre": "María García",
  "email": "maria@example.com",
  "contrasena": "password123",
  "productos": "Laptop, Teclado, Mouse"
}
```

**Respuesta:**
```json
{
  "success": true,
  "mensaje": "Usuario creado exitosamente",
  "usuario": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "nombre": "María García",
    "email": "maria@example.com",
    "productos": "Laptop, Teclado, Mouse",
    "activo": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### **🔍 Obtener Usuario por ID**
```http
GET /api/usuarios/:id
```

**Ejemplo:**
```http
GET /api/usuarios/64f8a1b2c3d4e5f6a7b8c9d0
```

**Respuesta:**
```json
{
  "success": true,
  "usuario": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "productos": "Laptop, Mouse",
    "activo": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### **✏️ Actualizar Usuario**
```http
PUT /api/usuarios/:id
```

**Body:**
```json
{
  "nombre": "Juan Carlos Pérez",
  "email": "juancarlos@example.com",
  "productos": "Laptop, Mouse, Monitor"
}
```

**Respuesta:**
```json
{
  "success": true,
  "mensaje": "Usuario actualizado exitosamente",
  "usuario": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "nombre": "Juan Carlos Pérez",
    "email": "juancarlos@example.com",
    "productos": "Laptop, Mouse, Monitor",
    "activo": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

---

### **🗑️ Eliminar Usuario (Soft Delete)**
```http
DELETE /api/usuarios/:id
```

**Respuesta:**
```json
{
  "success": true,
  "mensaje": "Usuario eliminado exitosamente",
  "usuario": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "productos": "Laptop, Mouse",
    "activo": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

---

### **🔎 Buscar Usuarios**
```http
GET /api/usuarios/buscar
```

**Parámetros:**
- `q` (opcional): Texto de búsqueda
- `limit` (opcional): Límite de resultados (default: 10)

**Ejemplo:**
```http
GET /api/usuarios/buscar?q=laptop&limit=5
```

**Respuesta:**
```json
{
  "success": true,
  "usuarios": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "productos": "Laptop, Mouse",
      "activo": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "total": 1
}
```

---

### **📊 Estadísticas de Usuarios**
```http
GET /api/usuarios/estadisticas
```

**Respuesta:**
```json
{
  "success": true,
  "estadisticas": {
    "total": 25
  }
}
```

---

## 🧪 **Pruebas con Postman**

### **Collection de Postman para Usuarios**

#### **1. Listar Usuarios**
```
Method: GET
URL: {{base_url}}/api/usuarios?page=1&limit=5
```

#### **2. Crear Usuario**
```
Method: POST
URL: {{base_url}}/api/usuarios
Headers: Content-Type: application/json
Body:
{
  "nombre": "Ana López",
  "email": "ana@example.com",
  "contrasena": "password123",
  "productos": "Laptop, Mouse, Teclado"
}
```

#### **3. Obtener Usuario por ID**
```
Method: GET
URL: {{base_url}}/api/usuarios/{{usuario_id}}
```

#### **4. Actualizar Usuario**
```
Method: PUT
URL: {{base_url}}/api/usuarios/{{usuario_id}}
Headers: Content-Type: application/json
Body:
{
  "nombre": "Ana María López",
  "productos": "Laptop, Mouse, Teclado, Monitor"
}
```

#### **5. Buscar Usuarios**
```
Method: GET
URL: {{base_url}}/api/usuarios/buscar?q=laptop&limit=3
```

#### **6. Eliminar Usuario**
```
Method: DELETE
URL: {{base_url}}/api/usuarios/{{usuario_id}}
```

#### **7. Estadísticas**
```
Method: GET
URL: {{base_url}}/api/usuarios/estadisticas
```

---

## 🔧 **Scripts de Postman**

### **Script para guardar usuario_id automáticamente**
```javascript
// En la pestaña "Tests" de "Crear Usuario"
if (pm.response.code === 201) {
    const response = pm.response.json();
    if (response.usuario && response.usuario._id) {
        pm.environment.set("usuario_id", response.usuario._id);
        console.log("Usuario ID guardado:", response.usuario._id);
    }
}
```

### **Script para verificar respuestas**
```javascript
// En la pestaña "Tests" de cualquier request
pm.test("Status code is 200/201", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201]);
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

## 🚨 **Códigos de Error**

- **400 Bad Request**: Datos de entrada inválidos
- **404 Not Found**: Usuario no encontrado
- **409 Conflict**: Email ya registrado
- **500 Internal Server Error**: Error interno del servidor

---

## 📝 **Ejemplos de Usuarios para Probar**

### **Usuario 1**
```json
{
  "nombre": "Carlos Rodríguez",
  "email": "carlos@example.com",
  "contrasena": "password123",
  "productos": "Laptop Gaming, Mouse RGB, Teclado Mecánico"
}
```

### **Usuario 2**
```json
{
  "nombre": "Laura Martínez",
  "email": "laura@example.com",
  "contrasena": "password123",
  "productos": "MacBook, Magic Mouse, Magic Keyboard"
}
```

### **Usuario 3**
```json
{
  "nombre": "Roberto Silva",
  "email": "roberto@example.com",
  "contrasena": "password123",
  "productos": "Desktop PC, Monitor 4K, Webcam HD"
}
```

---

## 💡 **Características Especiales**

### **✅ Soft Delete**
- Los usuarios no se eliminan físicamente
- Se marcan como `activo: false`
- Permite recuperación de datos

### **✅ Paginación**
- Control de páginas y límites
- Información de navegación
- Optimización de rendimiento

### **✅ Búsqueda Inteligente**
- Búsqueda por nombre, email y productos
- Búsqueda insensible a mayúsculas/minúsculas
- Resultados filtrados por usuarios activos

### **✅ Validaciones**
- Email único
- Campos requeridos
- Formato de datos validado

### **✅ Seguridad**
- Contraseñas excluidas de respuestas
- Validación de datos de entrada
- Manejo seguro de errores

---

¡Con esta API tienes un sistema completo de gestión de usuarios! 🎉 