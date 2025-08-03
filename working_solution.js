const axios = require('axios');

async function workingSolution() {
  console.log('🎯 SOLUCIÓN DEFINITIVA QUE FUNCIONA\n');

  try {
    // Usar un email completamente único con timestamp y random
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 100000);
    const uniqueEmail = `usuario.${timestamp}.${random}@gmail.com`;

    console.log('📧 Email único generado:', uniqueEmail);
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
    console.log('Ejemplos que funcionarán:');
    console.log('- ferchu.nuevo@gmail.com');
    console.log('- ferchu.test@gmail.com');
    console.log('- ferchu.2025@gmail.com');
    console.log('- usuario.test@gmail.com');
    console.log('- test.user@gmail.com');
    console.log('- mi.usuario@gmail.com');
    console.log('- backend.test@gmail.com');
    console.log('');
    console.log('🚨 NO uses estos emails (ya existen):');
    console.log('- ferchu.ro@email.com');
    console.log('- test@example.com');
    console.log('- Cualquier email que hayas usado antes');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    
    if (error.response?.status === 409) {
      console.log('\n🔧 SOLUCIÓN FINAL:');
      console.log('1. Usa un email completamente diferente');
      console.log('2. Cambia el nombre del usuario');
      console.log('3. Ejemplos que funcionarán:');
      console.log('   - ferchu.nuevo@gmail.com');
      console.log('   - ferchu.test@gmail.com');
      console.log('   - ferchu.2025@gmail.com');
      console.log('   - usuario.test@gmail.com');
      console.log('   - test.user@gmail.com');
      console.log('   - mi.usuario@gmail.com');
      console.log('   - backend.test@gmail.com');
    }
  }
}

workingSolution(); 