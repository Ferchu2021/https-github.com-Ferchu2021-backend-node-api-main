console.log('📋 CONFIGURACIÓN CORRECTA PARA POSTMAN\n');

console.log('🔗 URL:');
console.log('POST http://localhost:3001/api/usuarios/');
console.log('');

console.log('📝 Headers:');
console.log('Content-Type: application/json');
console.log('');

console.log('📄 Body (Raw JSON):');
console.log(JSON.stringify({
  nombre: "Ferchu",
  contrasena: "pass022",
  email: "ferchu.ro@email.com",
  productos: "Teclado",
  activo: true
}, null, 2));
console.log('');

console.log('✅ TODAS LAS RUTAS DISPONIBLES:');
console.log('');
console.log('GET    /api/usuarios/           - Listar usuarios');
console.log('POST   /api/usuarios/           - Crear usuario');
console.log('GET    /api/usuarios/:id        - Obtener usuario por ID');
console.log('PUT    /api/usuarios/:id        - Actualizar usuario');
console.log('DELETE /api/usuarios/:id        - Eliminar usuario');
console.log('GET    /api/usuarios/buscar     - Buscar usuarios');
console.log('GET    /api/usuarios/estadisticas - Estadísticas');
console.log('');

console.log('🚨 ERRORES COMUNES A EVITAR:');
console.log('');
console.log('❌ URL incorrecta: /usuario/');
console.log('✅ URL correcta: /api/usuarios/');
console.log('');
console.log('❌ Campo incorrecto: "contraseña"');
console.log('✅ Campo correcto: "contrasena"');
console.log('');
console.log('❌ Campo incorrecto: "producto"');
console.log('✅ Campo correcto: "productos"');
console.log('');

console.log('🎯 RESULTADO ESPERADO:');
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