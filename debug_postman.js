const axios = require('axios');

async function debugPostman() {
  console.log('🔍 DIAGNÓSTICO DEL PROBLEMA DE POSTMAN\n');

  try {
    // 1. Verificar que el servidor esté funcionando
    console.log('1️⃣ Verificando servidor...');
    const healthResponse = await axios.get('http://localhost:3001/health');
    console.log('✅ Servidor funcionando:', healthResponse.status);
    console.log('');

    // 2. Verificar la ruta de usuarios
    console.log('2️⃣ Verificando ruta de usuarios...');
    const usuariosResponse = await axios.get('http://localhost:3001/api/usuarios/');
    console.log('✅ GET /api/usuarios/ funciona:', usuariosResponse.status);
    console.log('');

    // 3. Probar POST con datos exactos del modelo
    console.log('3️⃣ Probando POST con datos correctos...');
    const timestamp = Date.now();
    const postData = {
      nombre: "Usuario Test",
      email: `test${timestamp}@example.com`,
      contrasena: "password123",
      productos: "Laptop, Mouse",
      activo: true
    };

    console.log('📤 Datos enviados:');
    console.log(JSON.stringify(postData, null, 2));
    console.log('');

    const postResponse = await axios.post('http://localhost:3001/api/usuarios/', postData);
    console.log('✅ POST exitoso:', postResponse.status);
    console.log('📥 Respuesta:');
    console.log(JSON.stringify(postResponse.data, null, 2));
    console.log('');

    // 4. Mostrar configuración exacta para Postman
    console.log('📋 CONFIGURACIÓN EXACTA PARA POSTMAN:');
    console.log('');
    console.log('🔗 URL:');
    console.log('POST http://localhost:3001/api/usuarios/');
    console.log('');
    console.log('📝 Headers:');
    console.log('Content-Type: application/json');
    console.log('');
    console.log('📄 Body (Raw JSON):');
    console.log(JSON.stringify({
      nombre: "Ferchu",
      email: "ferchu.ro@email.com",
      contrasena: "pass022",
      productos: "Teclado",
      activo: true
    }, null, 2));
    console.log('');

    // 5. Verificar campos requeridos del modelo
    console.log('📋 CAMPOS REQUERIDOS DEL MODELO:');
    console.log('✅ nombre: String (requerido)');
    console.log('✅ email: String (requerido, único)');
    console.log('✅ contrasena: String (requerido)');
    console.log('✅ productos: String (requerido)');
    console.log('✅ activo: Boolean (opcional, default: true)');
    console.log('');

    console.log('🎯 POSIBLES CAUSAS DEL ERROR 404:');
    console.log('1. URL incorrecta en Postman');
    console.log('2. Método HTTP incorrecto');
    console.log('3. Servidor no ejecutándose');
    console.log('4. Puerto incorrecto');
    console.log('');

  } catch (error) {
    console.error('❌ Error en el diagnóstico:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 SOLUCIÓN: El servidor no está ejecutándose');
      console.log('   Ejecuta: npm start');
    } else if (error.response?.status === 404) {
      console.log('\n🔧 SOLUCIÓN: Verifica la URL en Postman');
      console.log('   URL correcta: POST http://localhost:3001/api/usuarios/');
    }
  }
}

debugPostman(); 