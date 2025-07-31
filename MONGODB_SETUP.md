# 🗄️ Configuración de MongoDB Atlas

## 📋 **Paso 1: Crear cuenta en MongoDB Atlas**

1. **Ve a MongoDB Atlas**: https://www.mongodb.com/atlas
2. **Crea una cuenta gratuita** o inicia sesión
3. **Selecciona el plan gratuito** (M0 - Free)

## 🏗️ **Paso 2: Crear un Cluster**

1. **Crea un nuevo proyecto** (o usa el existente)
2. **Crea un cluster gratuito**:
   - Selecciona **"M0 - Free"**
   - Elige la **región más cercana** a ti
   - Haz clic en **"Create"**

## 🔐 **Paso 3: Configurar Seguridad**

### **Crear Usuario de Base de Datos:**
1. Ve a **"Database Access"**
2. Haz clic en **"Add New Database User"**
3. **Username**: `backend-user`
4. **Password**: `TuPasswordSeguro123`
5. **Database User Privileges**: `Read and write to any database`
6. Haz clic en **"Add User"**

### **Configurar IP Whitelist:**
1. Ve a **"Network Access"**
2. Haz clic en **"Add IP Address"**
3. Para desarrollo: **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Haz clic en **"Confirm"**

## 🔗 **Paso 4: Obtener la URL de Conexión**

1. Ve a **"Database"**
2. Haz clic en **"Connect"**
3. Selecciona **"Connect your application"**
4. **Driver**: Node.js
5. **Version**: 5.0 or later
6. **Copia la URL de conexión**

### **URL de ejemplo:**
```
mongodb+srv://backend-user:TuPasswordSeguro123@cluster0.xxxxx.mongodb.net/backend-node-api?retryWrites=true&w=majority
```

## ⚙️ **Paso 5: Configurar Variables de Entorno**

Actualiza tu archivo `.env` con la URL real:

```env
# MongoDB Atlas
MONGO_URI=mongodb+srv://backend-user:TuPasswordSeguro123@cluster0.xxxxx.mongodb.net/backend-node-api?retryWrites=true&w=majority

# Servidor
PORT=3001
NODE_ENV=development

# JWT
JWT_SECRET=tu_secreto_jwt_super_seguro_aqui_para_desarrollo

# Frontend
FRONTEND_URL=http://localhost:3000

# Logs
LOG_LEVEL=info
```

## 🧪 **Paso 6: Probar la Conexión**

```bash
# Iniciar el servidor principal
npm start

# Crear usuario administrador
npm run create-admin

# Ejecutar tests
npm test
```

## 📊 **Paso 7: Verificar en MongoDB Atlas**

1. Ve a **"Browse Collections"**
2. Deberías ver la base de datos **"backend-node-api"**
3. Con las colecciones:
   - `usuarios`
   - `datos`

## 🔧 **Solución de Problemas**

### **Error: "auth required"**
- Verifica que el usuario y contraseña sean correctos
- Asegúrate de que el usuario tenga permisos de lectura/escritura

### **Error: "connection timeout"**
- Verifica que tu IP esté en la whitelist
- Usa "Allow Access from Anywhere" para desarrollo

### **Error: "invalid connection string"**
- Verifica que la URL no tenga espacios extra
- Asegúrate de que la contraseña esté correctamente codificada

## 🎯 **Próximos Pasos**

1. **Configura MongoDB Atlas** siguiendo esta guía
2. **Actualiza el archivo .env** con tu URL real
3. **Ejecuta `npm start`** para probar la conexión
4. **Ejecuta `npm run create-admin`** para crear el primer usuario
5. **Ejecuta `npm test`** para verificar todo funciona

---

**¡Con MongoDB Atlas tendrás tu base de datos funcionando en la nube de forma gratuita! 🚀** 