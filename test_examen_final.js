const axios = require('axios');

const BASE_URL = 'https://backend-techstore.vercel.app';
const FRONTEND_URL = 'https://frontend-techstore.vercel.app';

console.log('🧪 INICIANDO PRUEBAS DEL EXAMEN FINAL');
console.log('=====================================\n');

// Configurar axios
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Variables para almacenar datos de prueba
let testToken = '';
let testProductId = '';

// Función para mostrar resultados
const mostrarResultado = (testName, success, message = '') => {
  const icon = success ? '✅' : '❌';
  const status = success ? 'PASÓ' : 'FALLÓ';
  console.log(`${icon} ${testName}: ${status}`);
  if (message) console.log(`   ${message}`);
  console.log('');
  return success;
};

// Función para manejar errores
const manejarError = (error, testName) => {
  const message = error.response?.data?.mensaje || error.message;
  return mostrarResultado(testName, false, message);
};

// 1. PRUEBA: Ruta pública para visualizar datos
const probarRutaPublica = async () => {
  try {
    console.log('1️⃣ Probando ruta pública para visualizar datos...');
    
    const response = await api.get('/api/producto');
    
    const success = response.status === 200 && 
                   response.data.success && 
                   Array.isArray(response.data.productos);
    
    return mostrarResultado(
      'Ruta pública GET /api/producto',
      success,
      `Productos obtenidos: ${response.data.productos?.length || 0}`
    );
  } catch (error) {
    return manejarError(error, 'Ruta pública GET /api/producto');
  }
};

// 2. PRUEBA: Registro de usuario
const probarRegistro = async () => {
  try {
    console.log('2️⃣ Probando registro de usuario...');
    
    const userData = {
      nombre: 'Usuario Test',
      email: `test${Date.now()}@example.com`,
      password: 'Test123!',
      productos: 'Productos de prueba'
    };
    
    const response = await api.post('/api/auth/register', userData);
    
    const success = response.status === 201 && 
                   response.data.success && 
                   response.data.token;
    
    if (success) {
      testToken = response.data.token;
    }
    
    return mostrarResultado(
      'Registro de usuario POST /api/auth/register',
      success,
      success ? 'Usuario registrado y token obtenido' : 'Error en registro'
    );
  } catch (error) {
    return manejarError(error, 'Registro de usuario POST /api/auth/register');
  }
};

// 3. PRUEBA: Login de usuario
const probarLogin = async () => {
  try {
    console.log('3️⃣ Probando login de usuario...');
    
    const loginData = {
      email: 'admin@techstore.com',
      password: 'Admin123!'
    };
    
    const response = await api.post('/api/auth/login', loginData);
    
    const success = response.status === 200 && 
                   response.data.success && 
                   response.data.token;
    
    if (success) {
      testToken = response.data.token;
    }
    
    return mostrarResultado(
      'Login de usuario POST /api/auth/login',
      success,
      success ? 'Login exitoso y token obtenido' : 'Error en login'
    );
  } catch (error) {
    return manejarError(error, 'Login de usuario POST /api/auth/login');
  }
};

// 4. PRUEBA: Verificar token
const probarVerificarToken = async () => {
  try {
    console.log('4️⃣ Probando verificación de token...');
    
    if (!testToken) {
      return mostrarResultado(
        'Verificación de token GET /api/auth/verify',
        false,
        'No hay token disponible'
      );
    }
    
    const response = await api.get('/api/auth/verify', {
      headers: { Authorization: `Bearer ${testToken}` }
    });
    
    const success = response.status === 200 && response.data.success;
    
    return mostrarResultado(
      'Verificación de token GET /api/auth/verify',
      success,
      success ? 'Token válido' : 'Token inválido'
    );
  } catch (error) {
    return manejarError(error, 'Verificación de token GET /api/auth/verify');
  }
};

// 5. PRUEBA: Crear producto (ruta privada)
const probarCrearProducto = async () => {
  try {
    console.log('5️⃣ Probando creación de producto (ruta privada)...');
    
    if (!testToken) {
      return mostrarResultado(
        'Crear producto POST /api/producto',
        false,
        'No hay token disponible'
      );
    }
    
    const productData = {
      nombre: 'Producto Test Examen',
      precio: 99.99,
      descripcion: 'Producto de prueba para el examen final',
      categoria: 'Otros',
      stock: 10
    };
    
    const response = await api.post('/api/producto', productData, {
      headers: { Authorization: `Bearer ${testToken}` }
    });
    
    const success = response.status === 201 && 
                   response.data.success && 
                   response.data.producto;
    
    if (success) {
      testProductId = response.data.producto._id || response.data.producto.id;
    }
    
    return mostrarResultado(
      'Crear producto POST /api/producto',
      success,
      success ? `Producto creado con ID: ${testProductId}` : 'Error al crear producto'
    );
  } catch (error) {
    return manejarError(error, 'Crear producto POST /api/producto');
  }
};

// 6. PRUEBA: Actualizar producto (ruta privada)
const probarActualizarProducto = async () => {
  try {
    console.log('6️⃣ Probando actualización de producto (ruta privada)...');
    
    if (!testToken || !testProductId) {
      return mostrarResultado(
        'Actualizar producto PUT /api/producto/:id',
        false,
        'No hay token o ID de producto disponible'
      );
    }
    
    const updateData = {
      nombre: 'Producto Test Actualizado',
      precio: 149.99,
      descripcion: 'Producto actualizado para el examen final'
    };
    
    const response = await api.put(`/api/producto/${testProductId}`, updateData, {
      headers: { Authorization: `Bearer ${testToken}` }
    });
    
    const success = response.status === 200 && response.data.success;
    
    return mostrarResultado(
      'Actualizar producto PUT /api/producto/:id',
      success,
      success ? 'Producto actualizado exitosamente' : 'Error al actualizar producto'
    );
  } catch (error) {
    return manejarError(error, 'Actualizar producto PUT /api/producto/:id');
  }
};

// 7. PRUEBA: Eliminar producto (ruta privada)
const probarEliminarProducto = async () => {
  try {
    console.log('7️⃣ Probando eliminación de producto (ruta privada)...');
    
    if (!testToken || !testProductId) {
      return mostrarResultado(
        'Eliminar producto DELETE /api/producto/:id',
        false,
        'No hay token o ID de producto disponible'
      );
    }
    
    const response = await api.delete(`/api/producto/${testProductId}`, {
      headers: { Authorization: `Bearer ${testToken}` }
    });
    
    const success = response.status === 200 && response.data.success;
    
    return mostrarResultado(
      'Eliminar producto DELETE /api/producto/:id',
      success,
      success ? 'Producto eliminado exitosamente' : 'Error al eliminar producto'
    );
  } catch (error) {
    return manejarError(error, 'Eliminar producto DELETE /api/producto/:id');
  }
};

// 8. PRUEBA: Acceso a ruta privada sin token
const probarAccesoSinToken = async () => {
  try {
    console.log('8️⃣ Probando acceso a ruta privada sin token...');
    
    const response = await api.post('/api/producto', {
      nombre: 'Producto sin token',
      precio: 50.00,
      descripcion: 'Este producto no debería crearse',
      categoria: 'Otros'
    });
    
    // Debería fallar (401 o 403)
    const success = response.status === 401 || response.status === 403;
    
    return mostrarResultado(
      'Acceso a ruta privada sin token',
      success,
      success ? 'Correctamente bloqueado sin token' : 'Error: permitió acceso sin token'
    );
  } catch (error) {
    // Esperamos que falle
    const success = error.response?.status === 401 || error.response?.status === 403;
    return mostrarResultado(
      'Acceso a ruta privada sin token',
      success,
      success ? 'Correctamente bloqueado sin token' : 'Error: permitió acceso sin token'
    );
  }
};

// 9. PRUEBA: Búsqueda de productos
const probarBusqueda = async () => {
  try {
    console.log('9️⃣ Probando búsqueda de productos...');
    
    const response = await api.get('/api/producto/buscar?q=laptop');
    
    const success = response.status === 200 && 
                   response.data.success && 
                   Array.isArray(response.data.productos);
    
    return mostrarResultado(
      'Búsqueda de productos GET /api/producto/buscar',
      success,
      success ? `Resultados encontrados: ${response.data.productos.length}` : 'Error en búsqueda'
    );
  } catch (error) {
    return manejarError(error, 'Búsqueda de productos GET /api/producto/buscar');
  }
};

// 10. PRUEBA: Productos por categoría
const probarProductosPorCategoria = async () => {
  try {
    console.log('🔟 Probando productos por categoría...');
    
    const response = await api.get('/api/producto/categoria/Laptops');
    
    const success = response.status === 200 && 
                   response.data.success && 
                   Array.isArray(response.data.productos);
    
    return mostrarResultado(
      'Productos por categoría GET /api/producto/categoria/:categoria',
      success,
      success ? `Productos en categoría: ${response.data.productos.length}` : 'Error al obtener por categoría'
    );
  } catch (error) {
    return manejarError(error, 'Productos por categoría GET /api/producto/categoria/:categoria');
  }
};

// Ejecutar todas las pruebas
const ejecutarPruebas = async () => {
  const resultados = [];
  
  resultados.push(await probarRutaPublica());
  resultados.push(await probarRegistro());
  resultados.push(await probarLogin());
  resultados.push(await probarVerificarToken());
  resultados.push(await probarCrearProducto());
  resultados.push(await probarActualizarProducto());
  resultados.push(await probarEliminarProducto());
  resultados.push(await probarAccesoSinToken());
  resultados.push(await probarBusqueda());
  resultados.push(await probarProductosPorCategoria());
  
  // Resumen final
  console.log('📊 RESUMEN DE PRUEBAS');
  console.log('=====================');
  
  const pruebasExitosas = resultados.filter(r => r).length;
  const totalPruebas = resultados.length;
  
  console.log(`✅ Pruebas exitosas: ${pruebasExitosas}/${totalPruebas}`);
  console.log(`❌ Pruebas fallidas: ${totalPruebas - pruebasExitosas}/${totalPruebas}`);
  console.log(`📈 Porcentaje de éxito: ${((pruebasExitosas / totalPruebas) * 100).toFixed(1)}%`);
  
  if (pruebasExitosas === totalPruebas) {
    console.log('\n🎉 ¡TODAS LAS PRUEBAS PASARON! El backend cumple con los requerimientos del examen.');
  } else {
    console.log('\n⚠️ Algunas pruebas fallaron. Revisa los errores arriba.');
  }
  
  console.log('\n🔗 URLs de la aplicación:');
  console.log(`   Backend: ${BASE_URL}`);
  console.log(`   Frontend: ${FRONTEND_URL}`);
};

// Ejecutar pruebas
ejecutarPruebas().catch(console.error); 