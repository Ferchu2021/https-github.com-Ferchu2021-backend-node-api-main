const axios = require('axios');

async function fixPostman() {
  console.log('🔧 ARREGLANDO EL PROBLEMA DE POSTMAN\n');

  try {
    // 1. Probar con email único
    console.log('1️⃣ Probando con email único...');
    const timestamp = Date.now();
    const uniqueData = {
      nombre: "Ferchu",
      email: `ferchu.${timestamp}@email.com`,
      contrasena: "pass022",
      productos: "Teclado",
      activo: true
    };

    console.log('📤 Datos enviados:');
    console.log(JSON.stringify(uniqueData, null, 2));
    console.log('');

    const response = await axios.post('http://localhost:3001/api/usuarios/', uniqueData);
    console.log('✅ ¡ÉXITO! Usuario creado correctamente');
    console.log('Status:', response.status);
    console.log('Respuesta:');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('');

    // 2. Mostrar configuración exacta para Postman
    console.log('📋 CONFIGURACIÓN EXACTA PARA POSTMAN:');
    console.log('');
    console.log('🔗 URL:');
    console.log('POST http://localhost:3001/api/usuarios/');
    console.log('');
    console.log('📝 Headers:');
    console.log('Content-Type: application/json');
    console.log('');
    console.log('📄 Body (Raw JSON) - CON EMAIL ÚNICO:');
    console.log(JSON.stringify({
      nombre: "Ferchu",
      email: `ferchu.${Date.now()}@email.com`,
      contrasena: "pass022",
      productos: "Teclado",
      activo: true
    }, null, 2));
    console.log('');

    // 3. Mostrar diferentes opciones de email
    console.log('📧 OPCIONES DE EMAIL ÚNICO:');
    console.log('1. ferchu.nuevo@email.com');
    console.log('2. ferchu.2025@email.com');
    console.log('3. ferchu.test@email.com');
    console.log('4. ferchu.agosto@email.com');
    console.log('5. ferchu.backend@email.com');
    console.log('');

    // 4. Verificar que el servidor funciona
    console.log('2️⃣ Verificando que el servidor funciona...');
    const healthResponse = await axios.get('http://localhost:3001/health');
    console.log('✅ Servidor funcionando:', healthResponse.status);
    console.log('');

    // 5. Verificar que la ruta existe
    console.log('3️⃣ Verificando que la ruta existe...');
    const usuariosResponse = await axios.get('http://localhost:3001/api/usuarios/');
    console.log('✅ Ruta funcionando:', usuariosResponse.status);
    console.log('');

    console.log('🎉 ¡PROBLEMA RESUELTO!');
    console.log('');
    console.log('📋 RESUMEN:');
    console.log('✅ El servidor funciona correctamente');
    console.log('✅ La ruta /api/usuarios/ existe');
    console.log('✅ El POST funciona con email único');
    console.log('✅ El problema era el email duplicado');
    console.log('');
    console.log('🔧 SOLUCIÓN:');
    console.log('Usa un email único en Postman y funcionará perfectamente');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    
    if (error.response?.status === 409) {
      console.log('\n🔧 SOLUCIÓN: El email ya existe');
      console.log('Usa un email único como: ferchu.nuevo@email.com');
    } else if (error.response?.status === 404) {
      console.log('\n🔧 SOLUCIÓN: URL incorrecta');
      console.log('Usa: POST http://localhost:3001/api/usuarios/');
    }
  }
}

fixPostman(); 