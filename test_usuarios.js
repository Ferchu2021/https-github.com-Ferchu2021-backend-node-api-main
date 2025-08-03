const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testUsuariosAPI() {
  console.log('🧪 Probando API de Usuarios...\n');

  try {
    // 1. Crear un usuario
    console.log('1️⃣ Creando usuario...');
    const timestamp = Date.now();
    const nuevoUsuario = {
      nombre: 'Juan Pérez',
      email: `juan${timestamp}@example.com`,
      contrasena: 'password123',
      productos: 'Laptop, Mouse, Teclado'
    };

    const crearResponse = await axios.post(`${BASE_URL}/api/usuarios`, nuevoUsuario);
    console.log('✅ Usuario creado:', crearResponse.data);
    const usuarioId = crearResponse.data.usuario._id;

    // 2. Listar usuarios
    console.log('\n2️⃣ Listando usuarios...');
    const listarResponse = await axios.get(`${BASE_URL}/api/usuarios?page=1&limit=5`);
    console.log('✅ Usuarios listados:', listarResponse.data);

    // 3. Obtener usuario por ID
    console.log('\n3️⃣ Obteniendo usuario por ID...');
    const obtenerResponse = await axios.get(`${BASE_URL}/api/usuarios/${usuarioId}`);
    console.log('✅ Usuario obtenido:', obtenerResponse.data);

    // 4. Buscar usuarios
    console.log('\n4️⃣ Buscando usuarios...');
    const buscarResponse = await axios.get(`${BASE_URL}/api/usuarios/buscar?q=laptop&limit=3`);
    console.log('✅ Búsqueda realizada:', buscarResponse.data);

    // 5. Actualizar usuario
    console.log('\n5️⃣ Actualizando usuario...');
    const actualizarData = {
      nombre: 'Juan Carlos Pérez',
      productos: 'Laptop, Mouse, Teclado, Monitor'
    };
    const actualizarResponse = await axios.put(`${BASE_URL}/api/usuarios/${usuarioId}`, actualizarData);
    console.log('✅ Usuario actualizado:', actualizarResponse.data);

    // 6. Estadísticas
    console.log('\n6️⃣ Obteniendo estadísticas...');
    const statsResponse = await axios.get(`${BASE_URL}/api/usuarios/estadisticas`);
    console.log('✅ Estadísticas:', statsResponse.data);

    // 7. Crear otro usuario para probar paginación
    console.log('\n7️⃣ Creando segundo usuario...');
    const segundoUsuario = {
      nombre: 'María García',
      email: `maria${timestamp}@example.com`,
      contrasena: 'password123',
      productos: 'MacBook, Magic Mouse'
    };
    await axios.post(`${BASE_URL}/api/usuarios`, segundoUsuario);
    console.log('✅ Segundo usuario creado');

    // 8. Listar con paginación
    console.log('\n8️⃣ Listando con paginación...');
    const paginacionResponse = await axios.get(`${BASE_URL}/api/usuarios?page=1&limit=2`);
    console.log('✅ Paginación:', paginacionResponse.data);

    console.log('\n🎉 ¡Todas las pruebas completadas exitosamente!');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.response?.data || error.message);
  }
}

testUsuariosAPI(); 