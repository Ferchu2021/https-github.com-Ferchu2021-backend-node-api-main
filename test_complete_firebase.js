const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testCompleteFirebase() {
  console.log('🔥 Prueba Completa de Firebase\n');

  try {
    // 1. Verificar que el servidor esté funcionando
    console.log('1️⃣ Verificando servidor...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Servidor funcionando:', healthResponse.data.status);
    console.log('');

    // 2. Probar endpoint de Firebase login
    console.log('2️⃣ Probando Firebase Login...');
    const loginResponse = await axios.post(`${BASE_URL}/api/firebase/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ Login response:', loginResponse.data);
    console.log('');

    // 3. Probar endpoint de Firebase register
    console.log('3️⃣ Probando Firebase Register...');
    const timestamp = Date.now();
    const registerResponse = await axios.post(`${BASE_URL}/api/firebase/auth/register`, {
      email: `test${timestamp}@example.com`,
      password: 'password123',
      displayName: 'Test User'
    });
    console.log('✅ Register response:', registerResponse.data);
    console.log('');

    // 4. Probar crear documento en Firestore
    console.log('4️⃣ Probando crear documento en Firestore...');
    const createDocResponse = await axios.post(`${BASE_URL}/api/firebase/firestore/test-collection`, {
      collection: 'test-collection',
      data: {
        name: 'Test Document',
        description: 'This is a test document',
        timestamp: new Date().toISOString(),
        testId: timestamp
      }
    });
    console.log('✅ Create document response:', createDocResponse.data);
    console.log('');

    // 5. Probar obtener documentos de Firestore
    console.log('5️⃣ Probando obtener documentos de Firestore...');
    const getDocsResponse = await axios.get(`${BASE_URL}/api/firebase/firestore/test-collection?limit=5`);
    console.log('✅ Get documents response:', getDocsResponse.data);
    console.log('');

    console.log('🎉 ¡TODOS LOS ENDPOINTS DE FIREBASE FUNCIONAN CORRECTAMENTE!');
    console.log('');
    console.log('📋 Resumen de funcionalidades:');
    console.log('   ✅ Firebase Admin SDK inicializado');
    console.log('   ✅ Firebase Authentication funcionando');
    console.log('   ✅ Firestore Database funcionando');
    console.log('   ✅ Endpoints de la API funcionando');
    console.log('');
    console.log('🚀 Tu backend está completamente configurado con Firebase!');

  } catch (error) {
    console.error('❌ Error en la prueba:', error.response?.data || error.message);
    
    if (error.response?.status === 500) {
      console.log('\n🔧 Posibles soluciones:');
      console.log('   1. Verifica que Authentication esté habilitado en Firebase Console');
      console.log('   2. Verifica que Firestore esté habilitado en Firebase Console');
      console.log('   3. Reinicia el servidor: npm start');
      console.log('   4. Verifica las credenciales en el archivo .env');
    }
  }
}

// Ejecutar la prueba
testCompleteFirebase(); 