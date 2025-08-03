const axios = require('axios');

async function finalSolution() {
  console.log('🎯 SOLUCIÓN DEFINITIVA PARA POSTMAN\n');

  try {
    // Usar un dominio completamente diferente
    const uniqueEmail = `test.${Date.now()}@gmail.com`;

    console.log('📧 Email único:', uniqueEmail);
    console.log('');

    const testData = {
      nombre: "Usuario Test",
      email: uniqueEmail,
      contrasena: "password123",
      productos: "Laptop, Mouse",
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
    console.log('🔗 URL:');
    console.log('POST http://localhost:3001/api/usuarios/');
    console.log('');
    console.log('📝 Headers:');
    console.log('Content-Type: application/json');
    console.log('');
    console.log('📄 Body (Raw JSON):');
    console.log(JSON.stringify({
      nombre: "Ferchu",
      email: "ferchu.nuevo@gmail.com",
      contrasena: "pass022",
      productos: "Teclado",
      activo: true
    }, null, 2));
    console.log('');
    console.log('🔧 IMPORTANTE:');
    console.log('Cambia el email por uno único cada vez que pruebes');
    console.log('Ejemplos:');
    console.log('- ferchu.nuevo@gmail.com');
    console.log('- ferchu.test@gmail.com');
    console.log('- ferchu.2025@gmail.com');
    console.log('- ferchu.backend@gmail.com');
    console.log('- ferchu.agosto@gmail.com');
    console.log('');
    console.log('🚨 NO uses:');
    console.log('- ferchu.ro@email.com (ya existe)');
    console.log('- test@example.com (ya existe)');
    console.log('- Cualquier email que hayas usado antes');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    
    if (error.response?.status === 409) {
      console.log('\n🔧 SOLUCIÓN FINAL:');
      console.log('1. Usa un dominio diferente (gmail.com, hotmail.com, etc.)');
      console.log('2. Cambia el nombre del usuario');
      console.log('3. Ejemplos que funcionarán:');
      console.log('   - ferchu.nuevo@gmail.com');
      console.log('   - ferchu.test@hotmail.com');
      console.log('   - ferchu.2025@yahoo.com');
      console.log('   - usuario.test@gmail.com');
      console.log('   - test.user@gmail.com');
    }
  }
}

finalSolution(); 