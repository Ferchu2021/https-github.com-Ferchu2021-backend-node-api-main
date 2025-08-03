console.log('📋 GUÍA PASO A PASO PARA CONFIGURAR POSTMAN\n');

console.log('🔧 PASO 1: CREAR NUEVA REQUEST');
console.log('1. Abre Postman');
console.log('2. Haz clic en "New" o "+"');
console.log('3. Selecciona "Request"');
console.log('');

console.log('🔧 PASO 2: CONFIGURAR MÉTODO HTTP');
console.log('1. En el dropdown, selecciona "POST"');
console.log('2. NO uses GET, PUT, DELETE');
console.log('');

console.log('🔧 PASO 3: CONFIGURAR URL');
console.log('1. En el campo URL, escribe EXACTAMENTE:');
console.log('   http://localhost:3001/api/usuarios/');
console.log('');
console.log('❌ NO uses:');
console.log('   - http://localhost:3001/usuario/');
console.log('   - http://localhost:3001/api/usuario/');
console.log('   - http://localhost:3001/api/producto/');
console.log('   - http://localhost:3001/api/email/');
console.log('');

console.log('🔧 PASO 4: CONFIGURAR HEADERS');
console.log('1. Ve a la pestaña "Headers"');
console.log('2. Agrega un nuevo header:');
console.log('   Key: Content-Type');
console.log('   Value: application/json');
console.log('');

console.log('🔧 PASO 5: CONFIGURAR BODY');
console.log('1. Ve a la pestaña "Body"');
console.log('2. Selecciona "raw"');
console.log('3. En el dropdown, selecciona "JSON"');
console.log('4. Copia y pega este JSON:');
console.log('');

const jsonExample = {
  nombre: "Ferchu",
  email: "ferchu.ro@email.com",
  contrasena: "pass022",
  productos: "Teclado",
  activo: true
};

console.log(JSON.stringify(jsonExample, null, 2));
console.log('');

console.log('🔧 PASO 6: VERIFICAR CONFIGURACIÓN');
console.log('✅ Método: POST');
console.log('✅ URL: http://localhost:3001/api/usuarios/');
console.log('✅ Headers: Content-Type: application/json');
console.log('✅ Body: Raw JSON con todos los campos');
console.log('');

console.log('🔧 PASO 7: ENVIAR REQUEST');
console.log('1. Haz clic en "Send"');
console.log('2. Deberías recibir una respuesta 201 (Created)');
console.log('');

console.log('🎯 RESULTADO ESPERADO:');
console.log('Status: 201 Created');
console.log('Response:');
console.log('{');
console.log('  "success": true,');
console.log('  "mensaje": "Usuario creado exitosamente",');
console.log('  "usuario": {');
console.log('    "_id": "...",');
console.log('    "nombre": "Ferchu",');
console.log('    "email": "ferchu.ro@email.com",');
console.log('    "productos": "Teclado",');
console.log('    "activo": true,');
console.log('    "createdAt": "...",');
console.log('    "updatedAt": "..."');
console.log('  }');
console.log('}');
console.log('');

console.log('🚨 ERRORES COMUNES:');
console.log('❌ Error 404: URL incorrecta');
console.log('❌ Error 400: JSON mal formateado');
console.log('❌ Error 409: Email ya existe');
console.log('❌ Error 500: Servidor no ejecutándose');
console.log('');

console.log('🔧 SOLUCIÓN PARA ERROR 404:');
console.log('1. Verifica que la URL sea: http://localhost:3001/api/usuarios/');
console.log('2. Verifica que el método sea POST');
console.log('3. Verifica que el servidor esté ejecutándose (npm start)');
console.log('4. Verifica que no haya espacios extra en la URL'); 