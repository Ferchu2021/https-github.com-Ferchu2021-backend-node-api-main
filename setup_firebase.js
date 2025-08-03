const fs = require('fs');
const path = require('path');

console.log('🔥 Configurando Firebase en tu proyecto');
console.log('=======================================\n');

console.log('📋 Para configurar Firebase necesitas:');
console.log('');
console.log('1. 🌐 Ve a https://console.firebase.google.com/');
console.log('2. 📝 Crea un nuevo proyecto o selecciona uno existente');
console.log('3. ⚙️  Ve a "Project Settings" (ícono de engranaje)');
console.log('4. 📱 Haz clic en "Add app" y selecciona "Web"');
console.log('5. 📋 Copia la configuración que te proporciona Firebase');
console.log('');

console.log('🔧 Variables de entorno necesarias:');
console.log('   FIREBASE_API_KEY=tu-api-key');
console.log('   FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com');
console.log('   FIREBASE_PROJECT_ID=tu-proyecto-id');
console.log('   FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com');
console.log('   FIREBASE_MESSAGING_SENDER_ID=123456789');
console.log('   FIREBASE_APP_ID=tu-app-id');
console.log('   FIREBASE_CLIENT_EMAIL=tu-service-account-email');
console.log('   FIREBASE_PRIVATE_KEY=tu-private-key');
console.log('   FIREBASE_DATABASE_URL=https://tu-proyecto.firebaseio.com');
console.log('');

console.log('📖 Pasos adicionales:');
console.log('1. 🔐 Ve a "Authentication" y habilita "Email/Password"');
console.log('2. 🗄️  Ve a "Firestore Database" y crea una base de datos');
console.log('3. 🔑 Ve a "Project Settings" > "Service accounts"');
console.log('4. 📄 Descarga el archivo JSON de la cuenta de servicio');
console.log('5. 📝 Extrae client_email y private_key del JSON');
console.log('');

console.log('✅ Una vez configurado, podrás usar:');
console.log('   - Firebase Authentication');
console.log('   - Firestore Database');
console.log('   - Firebase Storage (opcional)');
console.log('   - Firebase Functions (opcional)');
console.log('');

console.log('🚀 Endpoints disponibles:');
console.log('   POST /api/firebase/auth/login');
console.log('   POST /api/firebase/auth/register');
console.log('   POST /api/firebase/firestore/:collection');
console.log('   GET /api/firebase/firestore/:collection');
console.log('   PUT /api/firebase/firestore/:collection/:documentId');
console.log('   DELETE /api/firebase/firestore/:collection/:documentId');
console.log('');

console.log('📝 Ejemplo de uso:');
console.log('   curl -X POST http://localhost:3001/api/firebase/auth/register \\');
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"email":"test@example.com","password":"password123","displayName":"Test User"}\'');
console.log('');

console.log('🎉 ¡Firebase está listo para usar!'); 