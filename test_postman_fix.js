const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testUsuarioEndpoint() {
  console.log('🧪 Probando endpoint de usuarios...\n');

  try {
    // 1. Probar crear usuario con email único
    const timestamp = Date.now();
    console.log('1️⃣ Creando usuario...');
    const createResponse = await axios.post(`${BASE_URL}/api/usuarios/`, {
      nombre: "Ferchu",
      contrasena: "pass022",
      email: `ferchu.ro.${timestamp}@email.com`,
      productos: "Teclado",
      activo: true
    });
    
    console.log('✅ Usuario creado exitosamente:');
    console.log(JSON.stringify(createResponse.data, null, 2));
    console.log('');

    // 2. Probar obtener usuarios
    console.log('2️⃣ Obteniendo lista de usuarios...');
    const listResponse = await axios.get(`${BASE_URL}/api/usuarios/`);
    
    console.log('✅ Lista de usuarios (primeros 3):');
    const usuarios = listResponse.data.usuarios.slice(0, 3);
    console.log(JSON.stringify({ ...listResponse.data, usuarios }, null, 2));
    console.log('');

    // 3. Probar obtener usuario específico
    if (createResponse.data.usuario && createResponse.data.usuario._id) {
      console.log('3️⃣ Obteniendo usuario específico...');
      const getResponse = await axios.get(`${BASE_URL}/api/usuarios/${createResponse.data.usuario._id}`);
      
      console.log('✅ Usuario específico:');
      console.log(JSON.stringify(getResponse.data, null, 2));
      console.log('');
    }

    console.log('🎉 ¡Todas las pruebas pasaron exitosamente!');
    console.log('');
    console.log('📋 Resumen:');
    console.log('   ✅ POST /api/usuarios/ - Crear usuario');
    console.log('   ✅ GET /api/usuarios/ - Listar usuarios');
    console.log('   ✅ GET /api/usuarios/:id - Obtener usuario específico');
    console.log('');
    console.log('🔗 URL correcta para Postman: POST http://localhost:3001/api/usuarios/');
    console.log('');
    console.log('📝 JSON correcto para Postman:');
    console.log(JSON.stringify({
      nombre: "Ferchu",
      contrasena: "pass022",
      email: "ferchu.ro@email.com",
      productos: "Teclado",
      activo: true
    }, null, 2));

  } catch (error) {
    console.error('❌ Error en la prueba:', error.response?.data || error.message);
    
    if (error.response?.status === 400) {
      console.log('\n🔧 Posibles problemas:');
      console.log('   1. Verifica que el JSON esté bien formateado');
      console.log('   2. Asegúrate de usar "contrasena" en lugar de "contraseña"');
      console.log('   3. Asegúrate de usar "productos" en lugar de "producto"');
    }
  }
}

// Ejecutar la prueba
testUsuarioEndpoint(); 