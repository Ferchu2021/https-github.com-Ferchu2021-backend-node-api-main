const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testFirebaseEndpoints() {
  console.log('🔥 Probando endpoints de Firebase...\n');

  try {
    // 1. Probar login de Firebase
    console.log('1️⃣ Probando Firebase Login...');
    const loginResponse = await axios.post(`${BASE_URL}/api/firebase/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ Firebase Login:', loginResponse.data);
    console.log('');

    // 2. Probar registro de Firebase
    console.log('2️⃣ Probando Firebase Register...');
    const registerResponse = await axios.post(`${BASE_URL}/api/firebase/auth/register`, {
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      displayName: 'Test User'
    });
    console.log('✅ Firebase Register:', registerResponse.data);
    console.log('');

    // 3. Probar crear documento en Firestore
    console.log('3️⃣ Probando crear documento en Firestore...');
    const createDocResponse = await axios.post(`${BASE_URL}/api/firebase/firestore/test-collection`, {
      collection: 'test-collection',
      data: {
        name: 'Test Document',
        description: 'This is a test document',
        timestamp: new Date().toISOString()
      }
    });
    console.log('✅ Crear documento:', createDocResponse.data);
    console.log('');

    // 4. Probar obtener documentos de Firestore
    console.log('4️⃣ Probando obtener documentos de Firestore...');
    const getDocsResponse = await axios.get(`${BASE_URL}/api/firebase/firestore/test-collection?limit=5`);
    console.log('✅ Obtener documentos:', getDocsResponse.data);
    console.log('');

    console.log('🎉 ¡Todos los endpoints de Firebase funcionan correctamente!');

  } catch (error) {
    console.error('❌ Error probando Firebase:', error.response?.data || error.message);
    
    if (error.response?.status === 500) {
      console.log('\n🔧 Posibles soluciones:');
      console.log('   1. Verifica que las credenciales de Firebase estén configuradas en .env');
      console.log('   2. Asegúrate de que el proyecto de Firebase esté activo');
      console.log('   3. Verifica que Firestore esté habilitado en tu proyecto');
    }
  }
}

// Ejecutar las pruebas
testFirebaseEndpoints(); 