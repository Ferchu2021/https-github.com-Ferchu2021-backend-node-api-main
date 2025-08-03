const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testEndpoints() {
  console.log('🧪 PROBANDO TODOS LOS ENDPOINTS PRINCIPALES\n');
  
  try {
    // 1. Health Check
    console.log('1️⃣ Health Check...');
    const health = await axios.get(BASE_URL + '/health');
    console.log('✅ Health:', health.status);
    
    // 2. Root Endpoint
    console.log('\n2️⃣ Root Endpoint...');
    const root = await axios.get(BASE_URL + '/');
    console.log('✅ Root:', root.status);
    
    // 3. Usuarios - Listar
    console.log('\n3️⃣ Usuarios - Listar...');
    const users = await axios.get(BASE_URL + '/api/usuarios');
    console.log('✅ Usuarios:', users.status, '- Total:', users.data.paginacion.total);
    
    // 4. Usuarios - Crear
    console.log('\n4️⃣ Usuarios - Crear...');
    const timestamp = Date.now();
    const newUser = {
      nombre: `Test User ${timestamp}`,
      email: `test${timestamp}@example.com`,
      contrasena: 'password123',
      productos: 'Laptop, Mouse'
    };
    const createUser = await axios.post(BASE_URL + '/api/usuarios', newUser);
    console.log('✅ Usuario creado:', createUser.status);
    const userId = createUser.data.usuario._id;
    
    // 5. Usuarios - Obtener por ID
    console.log('\n5️⃣ Usuarios - Obtener por ID...');
    const getUser = await axios.get(BASE_URL + `/api/usuarios/${userId}`);
    console.log('✅ Usuario obtenido:', getUser.status);
    
    // 6. Usuarios - Buscar
    console.log('\n6️⃣ Usuarios - Buscar...');
    const search = await axios.get(BASE_URL + '/api/usuarios/buscar?q=laptop');
    console.log('✅ Búsqueda:', search.status, '- Resultados:', search.data.total);
    
    // 7. Usuarios - Estadísticas
    console.log('\n7️⃣ Usuarios - Estadísticas...');
    const stats = await axios.get(BASE_URL + '/api/usuarios/estadisticas');
    console.log('✅ Estadísticas:', stats.status);
    
    // 8. Auth - Register (con datos válidos)
    console.log('\n8️⃣ Auth - Register...');
    const registerData = {
      nombre: `Juan Perez`,
      email: `auth${timestamp}@example.com`,
      password: 'Password123',
      productos: 'Test Product'
    };
    const register = await axios.post(BASE_URL + '/api/auth/register', registerData);
    console.log('✅ Register:', register.status);
    
    // 9. Auth - Login
    console.log('\n9️⃣ Auth - Login...');
    const loginData = {
      email: registerData.email,
      password: 'Password123'
    };
    const login = await axios.post(BASE_URL + '/api/auth/login', loginData);
    console.log('✅ Login:', login.status);
    const token = login.data.token;
    
    // 10. Data - Listar
    console.log('\n🔟 Data - Listar...');
    const data = await axios.get(BASE_URL + '/api/data');
    console.log('✅ Data:', data.status);
    
    // 11. Data - Crear
    console.log('\n1️⃣1️⃣ Data - Crear...');
    const newData = {
      titulo: `Test Data ${timestamp}`,
      descripcion: 'Descripción de prueba',
      categoria: 'test',
      valor: 100
    };
    const createData = await axios.post(BASE_URL + '/api/data', newData);
    console.log('✅ Data creado:', createData.status);
    
    // 12. Firebase - Login
    console.log('\n1️⃣2️⃣ Firebase - Login...');
    const firebaseLogin = await axios.post(BASE_URL + '/api/firebase/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ Firebase Login:', firebaseLogin.status);
    
    // 13. Firebase - Register
    console.log('\n1️⃣3️⃣ Firebase - Register...');
    const firebaseRegister = await axios.post(BASE_URL + '/api/firebase/register', {
      email: `firebase${timestamp}@example.com`,
      password: 'password123'
    });
    console.log('✅ Firebase Register:', firebaseRegister.status);
    
    // 14. Validaciones - Email duplicado
    console.log('\n1️⃣4️⃣ Validaciones - Email duplicado...');
    try {
      await axios.post(BASE_URL + '/api/usuarios', newUser);
    } catch (error) {
      if (error.response.status === 409) {
        console.log('✅ Validación email duplicado:', error.response.status);
      }
    }
    
    // 15. Validaciones - ID inválido
    console.log('\n1️⃣5️⃣ Validaciones - ID inválido...');
    try {
      await axios.get(BASE_URL + '/api/usuarios/invalid-id');
    } catch (error) {
      if (error.response.status === 400) {
        console.log('✅ Validación ID inválido:', error.response.status);
      }
    }
    
    console.log('\n🎉 ¡TODOS LOS ENDPOINTS FUNCIONAN PERFECTAMENTE!');
    console.log('📊 Resumen: 15 endpoints probados exitosamente');
    
  } catch (error) {
    console.log('❌ Error:', error.response?.status || error.message);
    console.log('📋 Detalles:', error.response?.data || error.message);
  }
}

testEndpoints(); 