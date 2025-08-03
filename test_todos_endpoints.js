const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(`🔍 ${title}`, 'cyan');
  console.log('='.repeat(60));
}

function logTest(testName, status, details = '') {
  const icon = status === 'PASS' ? '✅' : '❌';
  const color = status === 'PASS' ? 'green' : 'red';
  log(`${icon} ${testName}`, color);
  if (details) {
    log(`   ${details}`, 'yellow');
  }
}

async function testEndpoint(method, url, data = null, expectedStatus = 200, description = '') {
  try {
    const config = {
      method,
      url: `${BASE_URL}${url}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    
    if (response.status === expectedStatus) {
      logTest(description || `${method} ${url}`, 'PASS', `Status: ${response.status}`);
      return { success: true, data: response.data };
    } else {
      logTest(description || `${method} ${url}`, 'FAIL', `Expected ${expectedStatus}, got ${response.status}`);
      return { success: false, error: `Status ${response.status}` };
    }
  } catch (error) {
    const status = error.response?.status || 'Network Error';
    logTest(description || `${method} ${url}`, 'FAIL', `Error: ${status} - ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function testAllEndpoints() {
  log('🧪 INICIANDO PRUEBAS COMPLETAS DE TODOS LOS ENDPOINTS', 'bright');
  log('📊 URL Base: ' + BASE_URL, 'blue');
  
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  
  // Variables para almacenar datos de prueba
  let authToken = null;
  let userId = null;
  let dataId = null;

  // ========================================
  // 1. PRUEBAS DE SALUD Y CONFIGURACIÓN
  // ========================================
  logSection('SALUD Y CONFIGURACIÓN');
  
  // Health check
  const healthResult = await testEndpoint('GET', '/health', null, 200, 'Health Check');
  totalTests++; if (healthResult.success) passedTests++; else failedTests++;
  
  // Root endpoint
  const rootResult = await testEndpoint('GET', '/', null, 200, 'Root Endpoint');
  totalTests++; if (rootResult.success) passedTests++; else failedTests++;

  // ========================================
  // 2. PRUEBAS DE AUTENTICACIÓN
  // ========================================
  logSection('AUTENTICACIÓN');
  
  // Crear usuario para pruebas de auth
  const timestamp = Date.now();
  const testUser = {
    nombre: `Test User ${timestamp}`,
    email: `test${timestamp}@example.com`,
    contrasena: 'password123',
    productos: 'Test Product'
  };
  
  const createUserResult = await testEndpoint('POST', '/api/auth/register', testUser, 201, 'Registrar Usuario');
  totalTests++; if (createUserResult.success) passedTests++; else failedTests++;
  
  // Login
  const loginData = {
    email: testUser.email,
    contrasena: 'password123'
  };
  
  const loginResult = await testEndpoint('POST', '/api/auth/login', loginData, 200, 'Login Usuario');
  totalTests++; if (loginResult.success) passedTests++; else failedTests++;
  
  if (loginResult.success) {
    authToken = loginResult.data.token;
    log(`   🔑 Token obtenido: ${authToken.substring(0, 20)}...`, 'yellow');
  }

  // ========================================
  // 3. PRUEBAS DE USUARIOS (SIN AUTH)
  // ========================================
  logSection('USUARIOS - ENDPOINTS PÚBLICOS');
  
  // Listar usuarios
  const listUsersResult = await testEndpoint('GET', '/api/usuarios?page=1&limit=5', null, 200, 'Listar Usuarios');
  totalTests++; if (listUsersResult.success) passedTests++; else failedTests++;
  
  // Crear usuario
  const newUser = {
    nombre: `Nuevo Usuario ${timestamp}`,
    email: `nuevo${timestamp}@example.com`,
    contrasena: 'password123',
    productos: 'Laptop, Mouse, Teclado'
  };
  
  const createUsuarioResult = await testEndpoint('POST', '/api/usuarios', newUser, 201, 'Crear Usuario');
  totalTests++; if (createUsuarioResult.success) passedTests++; else failedTests++;
  
  if (createUsuarioResult.success) {
    userId = createUsuarioResult.data.usuario._id;
    log(`   🆔 ID de usuario creado: ${userId}`, 'yellow');
  }
  
  // Obtener usuario por ID
  if (userId) {
    const getUserResult = await testEndpoint('GET', `/api/usuarios/${userId}`, null, 200, 'Obtener Usuario por ID');
    totalTests++; if (getUserResult.success) passedTests++; else failedTests++;
  }
  
  // Buscar usuarios
  const searchResult = await testEndpoint('GET', '/api/usuarios/buscar?q=laptop&limit=3', null, 200, 'Buscar Usuarios');
  totalTests++; if (searchResult.success) passedTests++; else failedTests++;
  
  // Estadísticas de usuarios
  const statsResult = await testEndpoint('GET', '/api/usuarios/estadisticas', null, 200, 'Estadísticas de Usuarios');
  totalTests++; if (statsResult.success) passedTests++; else failedTests++;

  // ========================================
  // 4. PRUEBAS DE USUARIOS (CON AUTH)
  // ========================================
  logSection('USUARIOS - ENDPOINTS CON AUTENTICACIÓN');
  
  if (userId && authToken) {
    // Actualizar usuario
    const updateData = {
      nombre: `Usuario Actualizado ${timestamp}`,
      productos: 'Laptop, Mouse, Teclado, Monitor'
    };
    
    const updateResult = await testEndpoint('PUT', `/api/usuarios/${userId}`, updateData, 200, 'Actualizar Usuario', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    totalTests++; if (updateResult.success) passedTests++; else failedTests++;
    
    // Eliminar usuario (soft delete)
    const deleteResult = await testEndpoint('DELETE', `/api/usuarios/${userId}`, null, 200, 'Eliminar Usuario (Soft Delete)', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    totalTests++; if (deleteResult.success) passedTests++; else failedTests++;
  }

  // ========================================
  // 5. PRUEBAS DE DATOS
  // ========================================
  logSection('DATOS');
  
  // Listar datos
  const listDataResult = await testEndpoint('GET', '/api/data', null, 200, 'Listar Datos');
  totalTests++; if (listDataResult.success) passedTests++; else failedTests++;
  
  // Crear dato
  const newData = {
    titulo: `Test Data ${timestamp}`,
    descripcion: 'Descripción de prueba',
    categoria: 'test',
    valor: 100
  };
  
  const createDataResult = await testEndpoint('POST', '/api/data', newData, 201, 'Crear Dato');
  totalTests++; if (createDataResult.success) passedTests++; else failedTests++;
  
  if (createDataResult.success) {
    dataId = createDataResult.data.data._id;
    log(`   🆔 ID de dato creado: ${dataId}`, 'yellow');
  }
  
  // Obtener dato por ID
  if (dataId) {
    const getDataResult = await testEndpoint('GET', `/api/data/${dataId}`, null, 200, 'Obtener Dato por ID');
    totalTests++; if (getDataResult.success) passedTests++; else failedTests++;
  }

  // ========================================
  // 6. PRUEBAS DE FIREBASE
  // ========================================
  logSection('FIREBASE');
  
  // Firebase login
  const firebaseLoginData = {
    email: 'test@example.com',
    password: 'password123'
  };
  
  const firebaseLoginResult = await testEndpoint('POST', '/api/firebase/login', firebaseLoginData, 200, 'Firebase Login');
  totalTests++; if (firebaseLoginResult.success) passedTests++; else failedTests++;
  
  // Firebase register
  const firebaseRegisterData = {
    email: `firebase${timestamp}@example.com`,
    password: 'password123'
  };
  
  const firebaseRegisterResult = await testEndpoint('POST', '/api/firebase/register', firebaseRegisterData, 201, 'Firebase Register');
  totalTests++; if (firebaseRegisterResult.success) passedTests++; else failedTests++;

  // ========================================
  // 7. PRUEBAS DE ERRORES Y VALIDACIONES
  // ========================================
  logSection('VALIDACIONES Y ERRORES');
  
  // Usuario con email duplicado
  const duplicateUser = {
    nombre: 'Usuario Duplicado',
    email: testUser.email, // Email ya existente
    contrasena: 'password123',
    productos: 'Test'
  };
  
  const duplicateResult = await testEndpoint('POST', '/api/usuarios', duplicateUser, 409, 'Validar Email Duplicado');
  totalTests++; if (duplicateResult.success) passedTests++; else failedTests++;
  
  // Usuario con datos faltantes
  const invalidUser = {
    nombre: 'Usuario Inválido'
    // Falta email y contrasena
  };
  
  const invalidResult = await testEndpoint('POST', '/api/usuarios', invalidUser, 400, 'Validar Datos Faltantes');
  totalTests++; if (invalidResult.success) passedTests++; else failedTests++;
  
  // ID inválido
  const invalidIdResult = await testEndpoint('GET', '/api/usuarios/invalid-id', null, 400, 'Validar ID Inválido');
  totalTests++; if (invalidIdResult.success) passedTests++; else failedTests++;
  
  // Usuario no encontrado
  const notFoundResult = await testEndpoint('GET', '/api/usuarios/507f1f77bcf86cd799439011', null, 404, 'Usuario No Encontrado');
  totalTests++; if (notFoundResult.success) passedTests++; else failedTests++;

  // ========================================
  // 8. PRUEBAS DE PAGINACIÓN Y FILTROS
  // ========================================
  logSection('PAGINACIÓN Y FILTROS');
  
  // Paginación
  const paginationResult = await testEndpoint('GET', '/api/usuarios?page=1&limit=2', null, 200, 'Paginación (2 por página)');
  totalTests++; if (paginationResult.success) passedTests++; else failedTests++;
  
  // Búsqueda con filtros
  const searchFilterResult = await testEndpoint('GET', '/api/usuarios/buscar?q=test&limit=5', null, 200, 'Búsqueda con Filtros');
  totalTests++; if (searchFilterResult.success) passedTests++; else failedTests++;

  // ========================================
  // 9. PRUEBAS DE RENDIMIENTO
  // ========================================
  logSection('RENDIMIENTO');
  
  // Múltiples requests rápidos
  const startTime = Date.now();
  const promises = [];
  
  for (let i = 0; i < 5; i++) {
    promises.push(axios.get(`${BASE_URL}/health`));
  }
  
  try {
    await Promise.all(promises);
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    logTest('Múltiples Requests Simultáneos', 'PASS', `5 requests en ${duration}ms`);
    totalTests++; passedTests++;
  } catch (error) {
    logTest('Múltiples Requests Simultáneos', 'FAIL', error.message);
    totalTests++; failedTests++;
  }

  // ========================================
  // 10. RESUMEN FINAL
  // ========================================
  logSection('RESUMEN FINAL');
  
  log(`📊 TOTAL DE PRUEBAS: ${totalTests}`, 'bright');
  log(`✅ PRUEBAS EXITOSAS: ${passedTests}`, 'green');
  log(`❌ PRUEBAS FALLIDAS: ${failedTests}`, 'red');
  
  const successRate = ((passedTests / totalTests) * 100).toFixed(2);
  log(`📈 TASA DE ÉXITO: ${successRate}%`, 'cyan');
  
  if (failedTests === 0) {
    log('\n🎉 ¡TODAS LAS PRUEBAS PASARON EXITOSAMENTE!', 'green');
    log('🚀 La API está funcionando perfectamente', 'green');
  } else {
    log('\n⚠️  Algunas pruebas fallaron. Revisa los errores arriba.', 'yellow');
  }
  
  log('\n📋 ENDPOINTS PROBADOS:', 'bright');
  log('   ✅ Health Check', 'green');
  log('   ✅ Root Endpoint', 'green');
  log('   ✅ Autenticación (Register/Login)', 'green');
  log('   ✅ Usuarios CRUD', 'green');
  log('   ✅ Búsqueda y Filtros', 'green');
  log('   ✅ Paginación', 'green');
  log('   ✅ Estadísticas', 'green');
  log('   ✅ Datos CRUD', 'green');
  log('   ✅ Firebase Auth', 'green');
  log('   ✅ Validaciones', 'green');
  log('   ✅ Manejo de Errores', 'green');
  log('   ✅ Rendimiento', 'green');
}

// Ejecutar las pruebas
console.log('🚀 Iniciando pruebas completas...\n');
testAllEndpoints().catch(error => {
  log(`❌ Error fatal en las pruebas: ${error.message}`, 'red');
  process.exit(1);
}); 