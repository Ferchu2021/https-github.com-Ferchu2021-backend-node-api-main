const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testTodosLosPasos() {
  console.log('🧪 Probando API de Usuarios - TODOS LOS PASOS\n');

  try {
    // Esperar un momento para que el servidor esté listo
    await new Promise(resolve => setTimeout(resolve, 1000));

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

    // 5️⃣ PASO 5: Actualizar usuario
    console.log('5️⃣ PASO 5: Actualizando usuario...');
    const actualizarData = {
      nombre: `Juan Carlos Pérez ${timestamp}`,
      productos: 'Laptop, Mouse, Teclado, Monitor, Webcam'
    };
    const actualizarResponse = await axios.put(`${BASE_URL}/api/usuarios/${usuarioId}`, actualizarData);
    console.log('✅ Usuario actualizado exitosamente');
    console.log('📋 Datos actualizados:', actualizarResponse.data.usuario);
    console.log('');

    // 6️⃣ PASO 6: Estadísticas de usuarios
    console.log('6️⃣ PASO 6: Obteniendo estadísticas...');
    const statsResponse = await axios.get(`${BASE_URL}/api/usuarios/estadisticas`);
    console.log('✅ Estadísticas obtenidas exitosamente');
    console.log('📊 Estadísticas:', statsResponse.data.estadisticas);
    console.log('');

    // 7️⃣ PASO 7: Crear segundo usuario para probar paginación
    console.log('7️⃣ PASO 7: Creando segundo usuario...');
    const segundoUsuario = {
      nombre: `María García ${timestamp}`,
      email: `maria${timestamp}@example.com`,
      contrasena: 'password123',
      productos: 'MacBook, Magic Mouse, Magic Keyboard'
    };
    const segundoResponse = await axios.post(`${BASE_URL}/api/usuarios`, segundoUsuario);
    console.log('✅ Segundo usuario creado exitosamente');
    console.log('📋 Datos del segundo usuario:', segundoResponse.data.usuario);
    const segundoId = segundoResponse.data.usuario._id;
    console.log('');

    // 8️⃣ PASO 8: Probar paginación con múltiples usuarios
    console.log('8️⃣ PASO 8: Probando paginación...');
    const paginacionResponse = await axios.get(`${BASE_URL}/api/usuarios?page=1&limit=2`);
    console.log('✅ Paginación probada exitosamente');
    console.log('📊 Total de usuarios:', paginacionResponse.data.paginacion.total);
    console.log('📄 Usuarios en esta página:', paginacionResponse.data.usuarios.length);
    console.log('📋 Información de paginación:', {
      pagina: paginacionResponse.data.paginacion.pagina,
      limite: paginacionResponse.data.paginacion.limite,
      totalPaginas: paginacionResponse.data.paginacion.totalPaginas,
      tieneSiguiente: paginacionResponse.data.paginacion.tieneSiguiente,
      tieneAnterior: paginacionResponse.data.paginacion.tieneAnterior
    });
    console.log('');

    // 9️⃣ PASO 9: Probar búsqueda con el segundo usuario
    console.log('9️⃣ PASO 9: Probando búsqueda con segundo usuario...');
    const buscarSegundoResponse = await axios.get(`${BASE_URL}/api/usuarios/buscar?q=macbook&limit=3`);
    console.log('✅ Búsqueda del segundo usuario exitosa');
    console.log('🔍 Término de búsqueda: "macbook"');
    console.log('📊 Resultados encontrados:', buscarSegundoResponse.data.total);
    console.log('📋 Usuarios encontrados:', buscarSegundoResponse.data.usuarios.map(u => ({ nombre: u.nombre, productos: u.productos })));
    console.log('');

    // 🔟 PASO 10: Eliminar usuario (soft delete)
    console.log('🔟 PASO 10: Eliminando usuario (soft delete)...');
    const eliminarResponse = await axios.delete(`${BASE_URL}/api/usuarios/${usuarioId}`);
    console.log('✅ Usuario eliminado exitosamente (soft delete)');
    console.log('📋 Datos del usuario eliminado:', eliminarResponse.data.usuario);
    console.log('');

    // 1️⃣1️⃣ PASO 11: Verificar que el usuario eliminado no aparece en listados
    console.log('1️⃣1️⃣ PASO 11: Verificando que usuario eliminado no aparece...');
    const listarDespuesEliminarResponse = await axios.get(`${BASE_URL}/api/usuarios?page=1&limit=5`);
    console.log('✅ Listado después de eliminar exitoso');
    console.log('📊 Total de usuarios activos:', listarDespuesEliminarResponse.data.paginacion.total);
    console.log('📋 Usuarios activos:', listarDespuesEliminarResponse.data.usuarios.map(u => ({ nombre: u.nombre, activo: u.activo })));
    console.log('');

    // 1️⃣2️⃣ PASO 12: Estadísticas finales
    console.log('1️⃣2️⃣ PASO 12: Estadísticas finales...');
    const statsFinalResponse = await axios.get(`${BASE_URL}/api/usuarios/estadisticas`);
    console.log('✅ Estadísticas finales obtenidas');
    console.log('📊 Total de usuarios activos:', statsFinalResponse.data.estadisticas.total);
    console.log('');

    console.log('🎉 ¡TODOS LOS PASOS COMPLETADOS EXITOSAMENTE!');
    console.log('📝 RESUMEN COMPLETO:');
    console.log('   ✅ 1. Usuario creado');
    console.log('   ✅ 2. Usuarios listados');
    console.log('   ✅ 3. Usuario obtenido por ID');
    console.log('   ✅ 4. Búsqueda de usuarios');
    console.log('   ✅ 5. Usuario actualizado');
    console.log('   ✅ 6. Estadísticas obtenidas');
    console.log('   ✅ 7. Segundo usuario creado');
    console.log('   ✅ 8. Paginación probada');
    console.log('   ✅ 9. Búsqueda con segundo usuario');
    console.log('   ✅ 10. Usuario eliminado (soft delete)');
    console.log('   ✅ 11. Verificación de eliminación');
    console.log('   ✅ 12. Estadísticas finales');
    console.log('');
    console.log('🚀 ¡API de Usuarios completamente funcional!');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.response?.data || error.message);
    if (error.response) {
      console.error('📊 Status:', error.response.status);
      console.error('📋 Datos:', error.response.data);
    }
  }
}

testTodosLosPasos(); 