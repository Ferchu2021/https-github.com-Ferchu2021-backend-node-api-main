const axios = require('axios');

const VERCEL_URL = 'https://backend-techstore.vercel.app';

async function testVercelProductoRoute() {
  console.log('🌐 Probando ruta /api/producto en Vercel...\n');

  try {
    // Test 1: GET /api/producto
    console.log('1️⃣ Probando GET /api/producto en Vercel');
    const getResponse = await axios.get(`${VERCEL_URL}/api/producto/`);
    console.log('✅ GET exitoso:', getResponse.status);
    console.log('📦 Productos:', getResponse.data.productos.length);
    console.log('');

    // Test 2: POST /api/producto
    console.log('2️⃣ Probando POST /api/producto en Vercel');
    const newProduct = {
      nombre: 'Vercel Test Product',
      precio: 199.99,
      descripcion: 'Producto de prueba en Vercel',
      categoria: 'Vercel Test',
      stock: 5
    };

    const postResponse = await axios.post(`${VERCEL_URL}/api/producto/`, newProduct, {
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://frontend-techstore.vercel.app'
      }
    });
    console.log('✅ POST exitoso:', postResponse.status);
    console.log('🆕 Producto creado:', postResponse.data.producto);
    console.log('');

    // Test 3: OPTIONS /api/producto (CORS)
    console.log('3️⃣ Probando OPTIONS /api/producto en Vercel (CORS)');
    const optionsResponse = await axios.options(`${VERCEL_URL}/api/producto/`, {
      headers: {
        'Origin': 'https://frontend-techstore.vercel.app',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    console.log('✅ OPTIONS exitoso:', optionsResponse.status);
    console.log('🌐 CORS headers:', {
      'Access-Control-Allow-Origin': optionsResponse.headers['access-control-allow-origin'],
      'Access-Control-Allow-Methods': optionsResponse.headers['access-control-allow-methods'],
      'Access-Control-Allow-Headers': optionsResponse.headers['access-control-allow-headers']
    });

    console.log('\n🎉 ¡Todas las pruebas pasaron! La ruta /api/producto está funcionando correctamente en Vercel.');

  } catch (error) {
    console.error('❌ Error en la prueba de Vercel:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    }
  }
}

// Ejecutar la prueba
testVercelProductoRoute(); 