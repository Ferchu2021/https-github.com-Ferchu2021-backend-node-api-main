const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testPasoAPaso() {
  console.log('🧪 Probando API de Usuarios - Paso a Paso\n');

  try {
    // Esperar un momento para que el servidor esté listo
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 1️⃣ PASO 1: Crear un usuario
    console.log('1️⃣ PASO 1: Creando usuario...');
    const timestamp = Date.now();
    const nuevoUsuario = {
      nombre: `Juan Pérez ${timestamp}`,
      email: `juan${timestamp}@example.com`,
      contrasena: 'password123',
      productos: 'Laptop, Mouse, Teclado'
    };

    const crearResponse = await axios.post(`${BASE_URL}/api/usuarios`, nuevoUsuario);
    console.log('✅ Usuario creado exitosamente');
    console.log('📋 Datos del usuario:', crearResponse.data.usuario);
    const usuarioId = crearResponse.data.usuario._id;
    console.log('🆔 ID del usuario:', usuarioId);
    console.log('');

    // 2️⃣ PASO 2: Listar usuarios
    console.log('2️⃣ PASO 2: Listando usuarios...');
    const listarResponse = await axios.get(`${BASE_URL}/api/usuarios?page=1&limit=5`);
    console.log('✅ Usuarios listados exitosamente');
    console.log('📊 Total de usuarios:', listarResponse.data.paginacion.total);
    console.log('📄 Usuarios en esta página:', listarResponse.data.usuarios.length);
    console.log('📋 Lista de usuarios:', listarResponse.data.usuarios.map(u => ({ nombre: u.nombre, email: u.email })));
    console.log('');

    // 3️⃣ PASO 3: Obtener usuario por ID
    console.log('3️⃣ PASO 3: Obteniendo usuario por ID...');
    const obtenerResponse = await axios.get(`${BASE_URL}/api/usuarios/${usuarioId}`);
    console.log('✅ Usuario obtenido exitosamente');
    console.log('📋 Datos del usuario:', obtenerResponse.data.usuario);
    console.log('');

    // 4️⃣ PASO 4: Buscar usuarios
    console.log('4️⃣ PASO 4: Buscando usuarios...');
    const buscarResponse = await axios.get(`${BASE_URL}/api/usuarios/buscar?q=laptop&limit=3`);
    console.log('✅ Búsqueda realizada exitosamente');
    console.log('🔍 Término de búsqueda: "laptop"');
    console.log('📊 Resultados encontrados:', buscarResponse.data.total);
    console.log('📋 Usuarios encontrados:', buscarResponse.data.usuarios.map(u => ({ nombre: u.nombre, productos: u.productos })));
    console.log('');

    console.log('🎉 ¡Todos los pasos completados exitosamente!');
    console.log('📝 Resumen:');
    console.log('   ✅ Usuario creado');
    console.log('   ✅ Usuarios listados');
    console.log('   ✅ Usuario obtenido por ID');
    console.log('   ✅ Búsqueda de usuarios');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.response?.data || error.message);
    if (error.response) {
      console.error('📊 Status:', error.response.status);
      console.error('📋 Datos:', error.response.data);
    }
  }
}

testPasoAPaso(); 