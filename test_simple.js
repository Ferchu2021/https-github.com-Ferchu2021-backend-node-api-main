const axios = require('axios');

async function testSimple() {
  try {
    console.log('🧪 Probando ruta de usuarios...\n');
    
    // Probar GET /api/usuarios/
    console.log('1️⃣ Probando GET /api/usuarios/');
    const response = await axios.get('http://localhost:3001/api/usuarios/');
    console.log('✅ GET /api/usuarios/ funciona correctamente');
    console.log(`   Total usuarios: ${response.data.usuarios?.length || 0}`);
    console.log('');
    
    // Probar POST /api/usuarios/ con email único
    console.log('2️⃣ Probando POST /api/usuarios/');
    const timestamp = Date.now();
    const postResponse = await axios.post('http://localhost:3001/api/usuarios/', {
      nombre: "Test User",
      contrasena: "password123",
      email: `test${timestamp}@example.com`,
      productos: "Mouse",
      activo: true
    });
    console.log('✅ POST /api/usuarios/ funciona correctamente');
    console.log(`   Usuario creado: ${postResponse.data.usuario?.nombre}`);
    console.log('');
    
    console.log('🎉 ¡Todas las rutas funcionan correctamente!');
    console.log('');
    console.log('📋 CONFIGURACIÓN PARA POSTMAN:');
    console.log('URL: POST http://localhost:3001/api/usuarios/');
    console.log('Headers: Content-Type: application/json');
    console.log('Body:');
    console.log(JSON.stringify({
      nombre: "Ferchu",
      contrasena: "pass022",
      email: "ferchu.ro@email.com",
      productos: "Teclado",
      activo: true
    }, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testSimple(); 