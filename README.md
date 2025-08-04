# 🖥️ TechStore - Frontend

Frontend para empresa de equipos de informática desarrollado con React + Vite.

## 📋 Características

### ✅ Funcionalidades Implementadas
- **Página de Inicio Pública**: Muestra información de la empresa y productos destacados
- **Sistema de Login**: Autenticación con JWT y validaciones
- **Dashboard Privado**: Panel de control con estadísticas y acciones rápidas
- **Gestión de Productos**: CRUD completo con modales y confirmaciones
- **Rutas Protegidas**: Navegación segura con autenticación
- **Diseño Responsive**: Adaptable a diferentes dispositivos
- **Validaciones de Formularios**: Usando React Hook Form + Joi
- **Interfaz Moderna**: Diseño atractivo con gradientes y animaciones

### 🎨 Diseño y UX
- **Tema**: Empresa de equipos de informática (TechStore)
- **Colores**: Gradientes azul-púrpura (#667eea → #764ba2)
- **Iconos**: Emojis para mejor experiencia visual
- **Animaciones**: Transiciones suaves y efectos hover
- **Modales**: Para formularios y confirmaciones

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- Backend funcionando en `http://localhost:3001`

### Instalación
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd frontend-mcga

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles
```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Vista previa de la build
npm run lint     # Ejecutar ESLint
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   └── Navbar.jsx          # Barra de navegación
├── pages/
│   ├── Home.jsx            # Página de inicio pública
│   ├── Login.jsx           # Página de login
│   ├── Dashboard.jsx       # Dashboard privado
│   └── Productos.jsx       # Gestión de productos
├── App.jsx                 # Componente principal
├── App.css                 # Estilos globales
└── main.jsx               # Punto de entrada
```

## 🔐 Autenticación

### Credenciales de Prueba
- **Email**: admin@techstore.com
- **Contraseña**: admin123

### Flujo de Autenticación
1. Usuario ingresa credenciales en `/login`
2. Backend valida y retorna JWT
3. Token se guarda en localStorage
4. Usuario es redirigido al dashboard
5. Rutas protegidas verifican autenticación

## 📱 Páginas y Funcionalidades

### 🏠 Página de Inicio (`/`)
- **Público**: Accesible sin autenticación
- **Contenido**: 
  - Hero section con información de la empresa
  - Estadísticas de clientes registrados
  - Productos destacados
  - Información sobre la empresa
  - Call-to-action para login

### 🔐 Página de Login (`/login`)
- **Validaciones**:
  - Email con formato válido
  - Contraseña mínima 6 caracteres
- **Funcionalidades**:
  - Formulario con React Hook Form
  - Validaciones en tiempo real
  - Manejo de errores
  - Loading states

### 🎯 Dashboard (`/dashboard`)
- **Privado**: Requiere autenticación
- **Contenido**:
  - Estadísticas de la empresa
  - Acciones rápidas
  - Productos recientes
  - Información del usuario
  - Enlaces a otras secciones

### 🛒 Gestión de Productos (`/productos`)
- **Privado**: Requiere autenticación
- **Funcionalidades CRUD**:
  - ✅ **Crear**: Modal con formulario validado
  - ✅ **Leer**: Lista de productos con cards
  - ✅ **Actualizar**: Modal de edición
  - ✅ **Eliminar**: Modal de confirmación
- **Campos del Producto**:
  - Nombre (mínimo 3 caracteres)
  - Precio (número positivo)
  - Categoría (select con opciones)
  - Stock (número entero no negativo)
  - Descripción (mínimo 10 caracteres)

## 🎨 Componentes

### Navbar
- Logo de la empresa
- Navegación dinámica según autenticación
- Información del usuario logueado
- Botón de logout

### Modales
- **Crear/Editar Producto**: Formulario completo con validaciones
- **Confirmar Eliminación**: Modal de seguridad

### Cards de Productos
- Imagen del producto
- Información detallada
- Badges de categoría y stock
- Botones de acción (editar/eliminar)

## 🔧 Tecnologías Utilizadas

### Frontend
- **React 19**: Biblioteca de UI
- **Vite**: Build tool y servidor de desarrollo
- **React Router DOM**: Navegación y rutas
- **React Hook Form**: Manejo de formularios
- **Joi**: Validaciones de esquemas
- **Axios**: Cliente HTTP para API

### Estilos
- **CSS Puro**: Estilos personalizados
- **Grid y Flexbox**: Layout responsive
- **Gradientes**: Efectos visuales modernos
- **Animaciones CSS**: Transiciones suaves

## 🌐 API Endpoints

El frontend se conecta con el backend en `http://localhost:3001`:

- `GET /api/usuarios` - Obtener lista de usuarios (público)
- `POST /api/usuarios/login` - Autenticación de usuarios

## 📦 Dependencias

### Producción
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^6.x",
  "axios": "^1.11.0",
  "react-hook-form": "^7.x",
  "joi": "^17.13.3",
  "@hookform/resolvers": "^3.x"
}
```

### Desarrollo
```json
{
  "vite": "^7.0.4",
  "@vitejs/plugin-react": "^4.6.0",
  "eslint": "^9.30.1",
  "@types/react": "^19.1.8"
}
```

## 🚀 Deploy en Vercel

### Configuración
1. Conectar repositorio a Vercel
2. Configurar variables de entorno:
   ```
   VITE_API_URL=https://tu-backend.vercel.app
   ```
3. Build command: `npm run build`
4. Output directory: `dist`

### Variables de Entorno
```env
VITE_API_URL=http://localhost:3001
```

## 🧪 Testing

### Pruebas Manuales
1. **Navegación**: Verificar rutas públicas y privadas
2. **Login**: Probar credenciales válidas e inválidas
3. **CRUD Productos**: Crear, editar, eliminar productos
4. **Responsive**: Verificar en diferentes dispositivos

### Credenciales de Prueba
- Email: `admin@techstore.com`
- Contraseña: `admin123`

## 📝 Notas de Desarrollo

### Características Destacadas
- **Simplicidad**: Código limpio y fácil de entender
- **UX/UI**: Interfaz moderna y atractiva
- **Validaciones**: Formularios robustos con feedback
- **Seguridad**: Rutas protegidas y manejo de tokens
- **Responsive**: Adaptable a móviles y tablets

### Mejoras Futuras
- [ ] Integración con backend real para productos
- [ ] Filtros y búsqueda de productos
- [ ] Paginación
- [ ] Subida de imágenes
- [ ] Notificaciones push
- [ ] Tema oscuro

## 👨‍💻 Autor

Desarrollado para el examen final de MCGA.

## 📄 Licencia

Este proyecto es para fines educativos.
