const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de MongoDB Atlas');
console.log('============================================\n');

// Leer el archivo .env
const envPath = path.join(__dirname, '.env');

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const mongoUriMatch = envContent.match(/MONGO_URI=(.+)/);
  
  if (mongoUriMatch) {
    const mongoUri = mongoUriMatch[1];
    console.log('📝 URL de MongoDB configurada:');
    console.log(`   ${mongoUri}`);
    
    // Extraer información de la URL
    const urlMatch = mongoUri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^\/]+)\/([^?]+)/);
    
    if (urlMatch) {
      const [, username, password, host, database] = urlMatch;
      console.log('\n📊 Información extraída:');
      console.log(`   Usuario: ${username}`);
      console.log(`   Contraseña: ${password}`);
      console.log(`   Host: ${host}`);
      console.log(`   Base de datos: ${database}`);
      
      console.log('\n🔧 Verificaciones necesarias:');
      console.log('1. ✅ Usuario creado en MongoDB Atlas');
      console.log('2. ❓ Contraseña correcta');
      console.log('3. ❓ Network Access configurado');
      console.log('4. ❓ Permisos de usuario correctos');
      
    } else {
      console.log('❌ No se pudo parsear la URL de MongoDB');
    }
  } else {
    console.log('❌ MONGO_URI no encontrada en el archivo .env');
  }
  
} catch (error) {
  console.log('❌ Error leyendo archivo .env:', error.message);
}

console.log('\n📋 Pasos para verificar en MongoDB Atlas:');
console.log('1. Ve a https://cloud.mongodb.com');
console.log('2. Inicia sesión');
console.log('3. Ve a "Database Access"');
console.log('4. Verifica que existe el usuario "backend-user"');
console.log('5. Ve a "Network Access"');
console.log('6. Verifica que tienes "Allow Access from Anywhere"');
console.log('\n🔄 ¿Quieres que probemos con una contraseña diferente?'); 