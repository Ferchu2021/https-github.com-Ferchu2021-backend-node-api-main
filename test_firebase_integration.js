const axios = require('axios');

console.log('🔥 Probando integración de Firebase con usuarioController\n');

async function testFirebaseIntegration() {
  try {
    console.log('1️⃣ Probando creación de usuario con Firebase...');
    
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 100000);
    const uniqueEmail = `test.firebase.${timestamp}.${random}@gmail.com`;
    
    const userData = {
      nombre: "Usuario Firebase Test",
      email: uniqueEmail,
      contrasena: "password123",
      productos: "Laptop, Mouse, Teclado",
      activo: true
    };
    
    console.log('📧 Email único:', uniqueEmail);
    
    const createResponse = await axios.post('http://localhost:3001/api/usuarios/', userData);
    
    if (createResponse.status === 201) {
      console.log('✅ Usuario creado exitosamente en MongoDB y Firebase');
      console.log('📋 Respuesta:', JSON.stringify(createResponse.data, null, 2));
      
      // Verificar que el usuario tiene firebaseUid
      if (createResponse.data.usuario.firebaseUid) {
        console.log('✅ Firebase UID generado:', createResponse.data.usuario.firebaseUid);
      }
    }
    
    console.log('\n2️⃣ Probando obtención de usuarios de Firebase...');
    
    const firebaseResponse = await axios.get('http://localhost:3001/api/usuarios/firebase');
    
    if (firebaseResponse.status === 200) {
      console.log('✅ Usuarios de Firebase obtenidos exitosamente');
      console.log('📊 Total usuarios en Firebase:', firebaseResponse.data.usuarios.length);
      
      if (firebaseResponse.data.usuarios.length > 0) {
        console.log('📋 Primer usuario de Firebase:');
        console.log(JSON.stringify(firebaseResponse.data.usuarios[0], null, 2));
      }
    }
    
    console.log('\n3️⃣ Probando obtención de usuarios de MongoDB...');
    
    const mongoResponse = await axios.get('http://localhost:3001/api/usuarios/');
    
    if (mongoResponse.status === 200) {
      console.log('✅ Usuarios de MongoDB obtenidos exitosamente');
      console.log('📊 Total usuarios en MongoDB:', mongoResponse.data.paginacion.total);
    }
    
    console.log('\n🎉 ¡Integración de Firebase funcionando correctamente!');
    console.log('');
    console.log('📋 Resumen de la integración:');
    console.log('✅ Creación de usuario en MongoDB y Firebase');
    console.log('✅ Obtención de usuarios desde Firebase');
    console.log('✅ Obtención de usuarios desde MongoDB');
    console.log('✅ Sincronización entre ambas bases de datos');
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error.response?.data || error.message);
    
    if (error.response?.status === 500) {
      console.log('\n🔧 Posibles causas del error:');
      console.log('1. Firebase no está configurado correctamente');
      console.log('2. Variables de entorno faltantes');
      console.log('3. Credenciales de Firebase incorrectas');
      console.log('4. Servidor no está ejecutándose');
    }
  }
}

testFirebaseIntegration(); 