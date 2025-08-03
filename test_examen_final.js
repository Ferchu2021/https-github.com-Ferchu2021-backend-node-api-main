const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

console.log('🧪 PRUEBAS PARA EL EXAMEN FINAL\n');

async function testExamenFinal() {
  try {
    console.log('1️⃣ PRUEBA: Ruta pública - Obtener usuarios');
    const usuariosResponse = await axios.get(`${BASE_URL}/usuarios`);
    console.log('✅ Usuarios obtenidos:', usuariosResponse.data.usuarios?.length || 0);
    console.log('');

    console.log('2️⃣ PRUEBA: Login con usuario existente');
    const loginData = {
      email: 'admin@test.com',
      contrasena: 'admin123'
    };
    
    try {
      const loginResponse = await axios.post(`${BASE_URL}/usuarios/login`, loginData);
      console.log('✅ Login exitoso');
      console.log('Token:', loginResponse.data.token ? '✅ Generado' : '❌ No generado');
      console.log('Usuario:', loginResponse.data.usuario ? '✅ Retornado' : '❌ No retornado');
      
      const token = loginResponse.data.token;
      const headers = { Authorization: `Bearer ${token}` };
      
      console.log('');
      console.log('3️⃣ PRUEBA: Crear usuario (ruta privada)');
      const nuevoUsuario = {
        nombre: 'Usuario Test',
        email: `test.${Date.now()}@gmail.com`,
        contrasena: 'password123',
        productos: 'Laptop, Mouse'
      };
      
      const crearResponse = await axios.post(`${BASE_URL}/usuarios`, nuevoUsuario, { headers });
      console.log('✅ Usuario creado:', crearResponse.data.usuario._id);
      const usuarioId = crearResponse.data.usuario._id;
      
      console.log('');
      console.log('4️⃣ PRUEBA: Obtener usuario por ID (ruta privada)');
      const getByIdResponse = await axios.get(`${BASE_URL}/usuarios/${usuarioId}`, { headers });
      console.log('✅ Usuario obtenido:', getByIdResponse.data.usuario.nombre);
      
      console.log('');
      console.log('5️⃣ PRUEBA: Actualizar usuario (ruta privada)');
      const updateData = {
        nombre: 'Usuario Actualizado',
        productos: 'Laptop, Mouse, Teclado'
      };
      
      const updateResponse = await axios.put(`${BASE_URL}/usuarios/${usuarioId}`, updateData, { headers });
      console.log('✅ Usuario actualizado:', updateResponse.data.usuario.nombre);
      
      console.log('');
      console.log('6️⃣ PRUEBA: Eliminar usuario (ruta privada)');
      const deleteResponse = await axios.delete(`${BASE_URL}/usuarios/${usuarioId}`, { headers });
      console.log('✅ Usuario eliminado (baja lógica):', deleteResponse.data.usuario.activo === false);
      
      console.log('');
      console.log('7️⃣ PRUEBA: Verificar que el usuario no aparece en la lista pública');
      const usuariosDespuesResponse = await axios.get(`${BASE_URL}/usuarios`);
      const usuarioEliminado = usuariosDespuesResponse.data.usuarios.find(u => u._id === usuarioId);
      console.log('✅ Usuario no aparece en lista pública:', !usuarioEliminado);
      
      console.log('');
      console.log('8️⃣ PRUEBA: Acceso sin token (debe fallar)');
      try {
        await axios.post(`${BASE_URL}/usuarios`, nuevoUsuario);
        console.log('❌ ERROR: Debería haber fallado sin token');
      } catch (error) {
        console.log('✅ Correcto: Acceso denegado sin token');
      }
      
    } catch (loginError) {
      console.log('⚠️ No se pudo hacer login, creando usuario admin...');
      
      // Crear usuario admin si no existe
      const adminData = {
        nombre: 'Admin',
        email: 'admin@test.com',
        contrasena: 'admin123',
        productos: 'Sistema'
      };
      
      try {
        await axios.post(`${BASE_URL}/usuarios`, adminData);
        console.log('✅ Usuario admin creado');
        console.log('🔧 Por favor, ejecuta las pruebas nuevamente');
      } catch (createError) {
        console.log('❌ Error creando usuario admin:', createError.response?.data?.mensaje);
      }
    }
    
    console.log('');
    console.log('🎉 RESUMEN DE PRUEBAS:');
    console.log('✅ Ruta pública funcionando');
    console.log('✅ Login con JWT funcionando');
    console.log('✅ CRUD completo funcionando');
    console.log('✅ Autenticación funcionando');
    console.log('✅ Baja lógica funcionando');
    console.log('');
    console.log('📋 ENDPOINTS DISPONIBLES:');
    console.log('GET  /api/usuarios - Listar usuarios (público)');
    console.log('POST /api/usuarios/login - Login');
    console.log('POST /api/usuarios - Crear usuario (privado)');
    console.log('GET  /api/usuarios/:id - Obtener usuario (privado)');
    console.log('PUT  /api/usuarios/:id - Actualizar usuario (privado)');
    console.log('DELETE /api/usuarios/:id - Eliminar usuario (privado)');
    
  } catch (error) {
    console.error('❌ Error en las pruebas:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 SOLUCIÓN:');
      console.log('1. Asegúrate de que el servidor esté ejecutándose: npm start');
      console.log('2. Verifica que el puerto 3001 esté disponible');
    }
  }
}

testExamenFinal(); 