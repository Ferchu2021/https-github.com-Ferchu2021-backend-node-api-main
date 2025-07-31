const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando estado de MongoDB Atlas');
console.log('=====================================\n');

// Leer el archivo .env
const envPath = path.join(__dirname, '.env');

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const mongoUriMatch = envContent.match(/MONGO_URI=(.+)/);
  
  if (mongoUriMatch) {
    const mongoUri = mongoUriMatch[1];
    console.log('📝 URL actual configurada:');
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
      
      console.log('\n🔧 Checklist de verificación:');
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

console.log('\n📋 Verificaciones necesarias en MongoDB Atlas:');
console.log('');
console.log('🔐 Database Access:');
console.log('   - Verifica que existe el usuario "backend"');
console.log('   - Verifica que la contraseña es "backend123"');
console.log('   - Verifica que tiene permisos "Read and write to any database"');
console.log('');
console.log('🌐 Network Access:');
console.log('   - Verifica que tienes "Allow Access from Anywhere" (0.0.0.0/0)');
console.log('   - O agrega tu IP específica');
console.log('');
console.log('🗄️  Cluster:');
console.log('   - Verifica que el cluster está activo');
console.log('   - Verifica que el nombre del cluster es correcto');
console.log('');
console.log('🔄 ¿Quieres que probemos con una configuración diferente?'); 