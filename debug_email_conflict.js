const axios = require('axios');

async function debugEmailConflict() {
  console.log('🔍 DIAGNÓSTICO DEL CONFLICTO DE EMAIL\n');

  try {
    // 1. Verificar qué emails existen en la base de datos
    console.log('1️⃣ Verificando emails existentes...');
    const usuariosResponse = await axios.get('http://localhost:3001/api/usuarios/');
    console.log('✅ Total usuarios:', usuariosResponse.data.paginacion?.total || 0);
    
    if (usuariosResponse.data.usuarios) {
      console.log('📧 Emails existentes:');
      usuariosResponse.data.usuarios.forEach((usuario, index) => {
        console.log(`   ${index + 1}. ${usuario.email}`);
      });
    }
    console.log('');

    // 2. Probar con un email completamente único
    console.log('2️⃣ Probando con email completamente único...');
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 100000);
    const uniqueEmail = `test.${timestamp}.${random}@gmail.com`;

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

    // 3. Mostrar configuración exacta para Postman
    console.log('📋 CONFIGURACIÓN EXACTA PARA POSTMAN:');
    console.log('');
    console.log('🔗 URL: POST http://localhost:3001/api/usuarios/');
    console.log('');
    console.log('📝 Headers: Content-Type: application/json');
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

    console.log('🔧 SOLUCIÓN AL PROBLEMA:');
    console.log('1. Usa un email completamente único');
    console.log('2. Agrega timestamp al email');
    console.log('3. Ejemplo: ferchu.2025.12345@gmail.com');
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    
    if (error.response?.status === 409) {
      console.log('\n🔧 DIAGNÓSTICO DEL PROBLEMA:');
      console.log('1. El email que estás usando ya existe en la base de datos');
      console.log('2. La validación es case-sensitive (diferencia mayúsculas/minúsculas)');
      console.log('3. Puede haber espacios extra en el email');
      console.log('');
      console.log('🔧 SOLUCIÓN:');
      console.log('1. Usa un email completamente diferente');
      console.log('2. Agrega números o timestamp al email');
      console.log('3. Ejemplos que funcionarán:');
      console.log('   - ferchu.2025.12345@gmail.com');
      console.log('   - ferchu.test.67890@gmail.com');
      console.log('   - usuario.nuevo.2025@gmail.com');
      console.log('   - test.user.123@gmail.com');
    }
  }
}

debugEmailConflict(); 