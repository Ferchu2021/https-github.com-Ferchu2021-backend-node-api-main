# 🚀 Backend Node.js API - Versión 2.0.0

Una API REST completa construida con Node.js, Express, MongoDB y JWT, con funcionalidades avanzadas de seguridad, validación y logging.

## ✨ Características

- 🔐 **Autenticación JWT** completa con refresh tokens
- 👥 **Gestión de usuarios** con roles (admin/usuario)
- 📊 **Paginación y búsqueda** avanzada
- ✅ **Validación de datos** robusta
- 🛡️ **Seguridad** con Helmet, CORS y rate limiting
- 📝 **Logging** completo con Winston
- 🔒 **Encriptación** de contraseñas con bcrypt
- 🧪 **Tests** automatizados
- 📚 **Documentación** completa

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación stateless
- **bcrypt** - Encriptación de contraseñas
- **Winston** - Sistema de logging
- **Express Validator** - Validación de datos
- **Helmet** - Seguridad HTTP
- **CORS** - Cross-Origin Resource Sharing

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd backend-node-api
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear archivo `.env` en la raíz del proyecto:
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

### 4. Crear usuario administrador
```bash
npm run create-admin
```

### 5. Iniciar el servidor
```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

## 📊 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Iniciar servidor en producción |
| `npm run dev` | Iniciar servidor en desarrollo con nodemon |
| `npm test` | Ejecutar tests de la API |
| `npm run create-admin` | Crear usuario administrador |
| `npm run logs` | Ver logs combinados |
| `npm run logs-error` | Ver solo logs de errores |

## 🔐 Autenticación

### Credenciales por defecto
- **Email**: `admin@ejemplo.com`
- **Contraseña**: `Admin123`

### Obtener token JWT
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@ejemplo.com",
    "password": "Admin123"
  }'
```

## 📚 Documentación de la API

Ver [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) para documentación completa de todos los endpoints.

### Endpoints Principales

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/health` | Health check | No |
| GET | `/` | Información de la API | No |
| POST | `/api/auth/register` | Registro de usuario | No |
| POST | `/api/auth/login` | Login | No |
| GET | `/api/auth/verify` | Verificar token | Sí |
| POST | `/api/auth/refresh` | Renovar token | Sí |
| GET | `/api/usuarios` | Obtener usuarios | No |
| POST | `/api/usuarios` | Crear usuario | Admin |
| GET | `/api/usuarios/:id` | Obtener usuario | No |
| PUT | `/api/usuarios/:id` | Actualizar usuario | Sí |
| DELETE | `/api/usuarios/:id` | Eliminar usuario | Admin |
| GET | `/api/usuarios/perfil/me` | Mi perfil | Sí |
| PUT | `/api/usuarios/perfil/me` | Actualizar mi perfil | Sí |

## 🧪 Testing

### Ejecutar tests
```bash
npm test
```

Los tests verifican:
- ✅ Health check
- ✅ Autenticación JWT
- ✅ Validaciones
- ✅ Paginación
- ✅ Rate limiting
- ✅ Logging
- ✅ Seguridad

## 📁 Estructura del Proyecto

```
src/
├── app.js                 # Aplicación principal
├── controllers/           # Controladores
│   ├── authController.js
│   ├── dataController.js
│   └── usuarioController.js
├── middleware/           # Middlewares
│   ├── authMiddleware.js
│   ├── rateLimit.js
│   └── validate.js
├── models/              # Modelos de MongoDB
│   ├── data.js
│   └── usuario.js
├── routes/              # Rutas
│   ├── auth.js
│   ├── data.js
│   └── usuario.js
├── utils/               # Utilidades
│   └── logger.js
└── logs/                # Archivos de log
    ├── error.log
    └── combined.log
```

## 🔒 Seguridad

### Rate Limiting
- **General**: 100 requests por 15 minutos
- **Autenticación**: 5 intentos por 15 minutos
- **Creación de usuarios**: 3 usuarios por hora

### Validaciones
- **Email**: Formato válido y único
- **Contraseña**: Mínimo 6 caracteres, mayúscula, minúscula y número
- **Nombre**: 2-50 caracteres, solo letras y espacios
- **ID**: Formato MongoDB válido

### Headers de Seguridad
- **Helmet**: Headers de seguridad HTTP
- **CORS**: Configuración de origen cruzado
- **Content Security Policy**: Protección XSS

## 📝 Logging

Los logs se guardan en:
- `src/logs/error.log` - Solo errores
- `src/logs/combined.log` - Todos los logs

### Niveles de Log
- **error**: Errores de la aplicación
- **warn**: Advertencias
- **info**: Información general
- **debug**: Información de depuración

## 🚀 Despliegue

### Variables de Entorno para Producción
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/database
JWT_SECRET=secreto_super_seguro_y_largo_para_produccion
FRONTEND_URL=https://tu-frontend.com
LOG_LEVEL=error
```

### Plataformas Recomendadas
- **Vercel** - Despliegue serverless
- **Heroku** - Plataforma como servicio
- **DigitalOcean** - VPS
- **AWS** - Servicios en la nube

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la [documentación de la API](./API_DOCUMENTATION.md)
2. Ejecuta los tests: `npm test`
3. Verifica los logs: `npm run logs`
4. Abre un issue en GitHub

## 🎯 Próximas Funcionalidades

- [ ] Subida de archivos con Multer
- [ ] Notificaciones por email con Nodemailer
- [ ] Tests unitarios con Jest
- [ ] Documentación con Swagger
- [ ] Cache con Redis
- [ ] WebSockets para tiempo real
- [ ] Docker y Docker Compose

---

**¡Disfruta usando tu API! 🚀**
