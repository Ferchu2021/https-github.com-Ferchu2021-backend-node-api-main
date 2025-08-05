const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testProductoRoute() {
  console.log('🧪 Probando ruta /api/producto...\n');

  try {
    // Test 1: GET /api/producto
    console.log('1️⃣ Probando GET /api/producto');
    const getResponse = await axios.get(`${BASE_URL}/api/producto/`);
    console.log('✅ GET exitoso:', getResponse.status);
    console.log('📦 Productos:', getResponse.data.productos.length);
    console.log('');

    // Test 2: POST /api/producto
    console.log('2️⃣ Probando POST /api/producto');
    const newProduct = {
      nombre: 'Test Product',
      precio: 99.99,
      descripcion: 'Producto de prueba',
      categoria: 'Test',
      stock: 10
    };

    const postResponse = await axios.post(`${BASE_URL}/api/producto/`, newProduct, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ POST exitoso:', postResponse.status);
    console.log('🆕 Producto creado:', postResponse.data.producto);
    console.log('');

    // Test 3: OPTIONS /api/producto (CORS)
    console.log('3️⃣ Probando OPTIONS /api/producto (CORS)');
    const optionsResponse = await axios.options(`${BASE_URL}/api/producto/`, {
      headers: {
        'Origin': 'https://frontend-techstore.vercel.app',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    console.log('✅ OPTIONS exitoso:', optionsResponse.status);
    console.log('🌐 CORS headers:', {
      'Access-Control-Allow-Origin': optionsResponse.headers['access-control-allow-origin'],
      'Access-Control-Allow-Methods': optionsResponse.headers['access-control-allow-methods']
    });

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

// Ejecutar la prueba
testProductoRoute(); 