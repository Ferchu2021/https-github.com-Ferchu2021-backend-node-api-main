const axios = require('axios');

async function debugError400() {
  console.log('🔍 DIAGNÓSTICO DEL ERROR 400\n');

  try {
    // 1. Probar con datos exactos del modelo
    console.log('1️⃣ Probando con datos correctos...');
    const timestamp = Date.now();
    const correctData = {
      nombre: "Usuario Test",
      email: `test${timestamp}@example.com`,
      contrasena: "password123",
      productos: "Laptop, Mouse",
      activo: true
    };

    console.log('📤 Datos enviados:');
    console.log(JSON.stringify(correctData, null, 2));
    console.log('');

    const response = await axios.post('http://localhost:3001/api/usuarios/', correctData);
    console.log('✅ POST exitoso:', response.status);
    console.log('📥 Respuesta:');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('');

  } catch (error) {
    console.error('❌ Error 400 detectado:');
    console.error('Status:', error.response?.status);
    console.error('Mensaje:', error.response?.data);
    console.log('');

    // 2. Probar diferentes variaciones para identificar el problema
    console.log('2️⃣ Probando variaciones para identificar el problema...\n');

    const variations = [
      {
        name: 'Datos mínimos requeridos',
        data: {
          nombre: "Test User",
          email: `test${Date.now()}@example.com`,
          contrasena: "password123",
          productos: "Test"
        }
      },
      {
        name: 'Sin campo activo (debería usar default)',
        data: {
          nombre: "Test User",
          email: `test${Date.now() + 1}@example.com`,
          contrasena: "password123",
          productos: "Test"
        }
      },
      {
        name: 'Con campos extra (debería ignorarlos)',
        data: {
          nombre: "Test User",
          email: `test${Date.now() + 2}@example.com`,
          contrasena: "password123",
          productos: "Test",
          activo: true,
          campoExtra: "valor extra"
        }
      }
    ];

    for (const variation of variations) {
      try {
        console.log(`📤 Probando: ${variation.name}`);
        console.log(JSON.stringify(variation.data, null, 2));
        
        const varResponse = await axios.post('http://localhost:3001/api/usuarios/', variation.data);
        console.log('✅ Éxito:', varResponse.status);
        console.log('');
      } catch (varError) {
        console.log('❌ Error:', varError.response?.status, varError.response?.data?.mensaje);
        console.log('');
      }
    }

    // 3. Mostrar configuración exacta para Postman
    console.log('📋 CONFIGURACIÓN EXACTA PARA POSTMAN:');
    console.log('');
    console.log('🔗 URL: POST http://localhost:3001/api/usuarios/');
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

    // 4. Verificar validaciones
    console.log('🔍 POSIBLES CAUSAS DEL ERROR 400:');
    console.log('1. Campo faltante (nombre, email, contrasena, productos son requeridos)');
    console.log('2. Email ya existe en la base de datos');
    console.log('3. Formato de email inválido');
    console.log('4. JSON mal formateado');
    console.log('5. Headers incorrectos');
    console.log('');

    console.log('🔧 SOLUCIONES:');
    console.log('1. Usa un email único (agrega timestamp)');
    console.log('2. Verifica que todos los campos requeridos estén presentes');
    console.log('3. Asegúrate de que el JSON esté bien formateado');
    console.log('4. Verifica que el Content-Type sea application/json');
    console.log('');
  }
}

debugError400(); 