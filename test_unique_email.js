const axios = require('axios');

async function testUniqueEmail() {
  console.log('🔧 PROBANDO CON EMAIL COMPLETAMENTE ÚNICO\n');

  try {
    // Generar email único con timestamp y random
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const uniqueEmail = `ferchu.${timestamp}.${random}@email.com`;

    console.log('📧 Email único generado:', uniqueEmail);
    console.log('');

    const testData = {
      nombre: "Ferchu",
      email: uniqueEmail,
      contrasena: "pass022",
      productos: "Teclado",
      activo: true
    };

    console.log('📤 Datos enviados:');
    console.log(JSON.stringify(testData, null, 2));
    console.log('');

    const response = await axios.post('http://localhost:3001/api/usuarios/', testData);
    console.log('✅ ¡ÉXITO! Usuario creado correctamente');
    console.log('Status:', response.status);
    console.log('Respuesta:');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('');

    console.log('🎉 ¡PROBLEMA RESUELTO!');
    console.log('');
    console.log('📋 CONFIGURACIÓN FINAL PARA POSTMAN:');
    console.log('');
    console.log('🔗 URL: POST http://localhost:3001/api/usuarios/');
    console.log('');
    console.log('📝 Headers: Content-Type: application/json');
    console.log('');
    console.log('📄 Body (Raw JSON):');
    console.log(JSON.stringify({
      nombre: "Ferchu",
      email: "ferchu.nuevo@email.com",
      contrasena: "pass022",
      productos: "Teclado",
      activo: true
    }, null, 2));
    console.log('');
    console.log('🔧 IMPORTANTE:');
    console.log('Cambia el email por uno único cada vez que pruebes');
    console.log('Ejemplos: ferchu.nuevo@email.com, ferchu.test@email.com, etc.');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    
    if (error.response?.status === 409) {
      console.log('\n🔧 SOLUCIÓN:');
      console.log('1. Usa un email completamente diferente');
      console.log('2. Ejemplos:');
      console.log('   - ferchu.nuevo@email.com');
      console.log('   - ferchu.test@email.com');
      console.log('   - ferchu.2025@email.com');
      console.log('   - ferchu.backend@email.com');
      console.log('   - ferchu.agosto@email.com');
    }
  }
}

testUniqueEmail(); 