console.log('🔍 VERIFICANDO VARIABLES DE ENTORNO');
console.log('====================================\n');

const variables = [
  'MONGO_URI',
  'JWT_SECRET',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY'
];

console.log('Variables requeridas:');
variables.forEach(varName => {
  const value = process.env[varName];
  const status = value ? '✅ Configurada' : '❌ No configurada';
  const preview = value ? `${value.substring(0, 20)}...` : 'undefined';
  
  console.log(`${varName}: ${status}`);
  console.log(`   Valor: ${preview}\n`);
});

console.log('📋 INSTRUCCIONES PARA CONFIGURAR EN VERCEL:');
console.log('1. Ve a tu proyecto en Vercel Dashboard');
console.log('2. Settings > Environment Variables');
console.log('3. Agrega las siguientes variables:');
console.log('   - MONGO_URI: Tu conexión de MongoDB Atlas');
console.log('   - JWT_SECRET: Una clave secreta para JWT');
console.log('   - FIREBASE_PROJECT_ID: ID de tu proyecto Firebase');
console.log('   - FIREBASE_CLIENT_EMAIL: Email del cliente Firebase');
console.log('   - FIREBASE_PRIVATE_KEY: Clave privada de Firebase');

// Verificar si MongoDB URI está configurado
if (!process.env.MONGO_URI) {
  console.log('\n⚠️ ADVERTENCIA: MONGO_URI no está configurado');
  console.log('   Esto causará errores en la aplicación');
} else {
  console.log('\n✅ MONGO_URI está configurado correctamente');
}

if (!process.env.JWT_SECRET) {
  console.log('\n⚠️ ADVERTENCIA: JWT_SECRET no está configurado');
  console.log('   La autenticación no funcionará correctamente');
} else {
  console.log('\n✅ JWT_SECRET está configurado correctamente');
} 