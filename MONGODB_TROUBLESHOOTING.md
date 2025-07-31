# 🔧 Solución de Problemas - MongoDB Atlas

## ❌ **Error: "bad auth : authentication failed"**

### **Paso 1: Verificar Usuario en MongoDB Atlas**

1. **Ve a MongoDB Atlas**: https://cloud.mongodb.com
2. **Inicia sesión** con tu cuenta
3. **Ve a "Database Access"**
4. **Verifica que existe el usuario**: `mariafernandarodriguezuai`
5. **Si no existe, créalo**:
   - Haz clic en **"Add New Database User"**
   - **Username**: `mariafernandarodriguezuai`
   - **Password**: `db_123456.a`
   - **Database User Privileges**: `Read and write to any database`
   - Haz clic en **"Add User"**

### **Paso 2: Verificar Network Access**

1. **Ve a "Network Access"**
2. **Verifica que tu IP esté permitida**:
   - Para desarrollo: **"Allow Access from Anywhere"** (0.0.0.0/0)
   - O agrega tu IP específica

### **Paso 3: Obtener la URL Correcta**

1. **Ve a "Database"**
2. **Haz clic en "Connect"**
3. **Selecciona "Connect your application"**
4. **Driver**: Node.js
5. **Version**: 5.0 or later
6. **Copia la URL completa**

### **Paso 4: Probar Diferentes Formatos de URL**

Si el problema persiste, prueba estas variaciones:

```javascript
// Opción 1: URL original
MONGO_URI=mongodb+srv://mariafernandarodriguezuai:db_123456.a@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority

// Opción 2: Con contraseña codificada
MONGO_URI=mongodb+srv://mariafernandarodriguezuai:db_123456%2Ea@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority

// Opción 3: Sin caracteres especiales en la contraseña
MONGO_URI=mongodb+srv://mariafernandarodriguezuai:db123456a@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority
```

### **Paso 5: Crear un Nuevo Usuario (Recomendado)**

1. **Ve a "Database Access"**
2. **Crea un nuevo usuario**:
   - **Username**: `backend-user`
   - **Password**: `Backend123!`
   - **Database User Privileges**: `Read and write to any database`
3. **Usa la nueva URL**:
   ```
   MONGO_URI=mongodb+srv://backend-user:Backend123!@cluster0.mhwnsc1.mongodb.net/backend-node-api?retryWrites=true&w=majority
   ```

### **Paso 6: Verificar el Cluster**

1. **Asegúrate de que el cluster esté activo**
2. **Verifica que el nombre del cluster sea correcto**: `cluster0.mhwnsc1.mongodb.net`

## 🧪 **Script de Prueba**

Ejecuta este script para probar la conexión:

```bash
node test_connection.js
```

## 📞 **Soporte**

Si el problema persiste:
1. **Verifica las credenciales** en MongoDB Atlas
2. **Crea un nuevo usuario** con contraseña simple
3. **Verifica el acceso de red**
4. **Contacta soporte** de MongoDB Atlas

---

**¡Con estos pasos deberías poder conectar exitosamente! 🚀** 