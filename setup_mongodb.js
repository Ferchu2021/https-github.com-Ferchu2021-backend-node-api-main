const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🗄️  Configuración de MongoDB Atlas');
console.log('=====================================\n');

console.log('📋 Pasos para configurar MongoDB Atlas:');
console.log('');
console.log('1. Ve a https://www.mongodb.com/atlas');
console.log('2. Crea una cuenta gratuita');
console.log('3. Crea un cluster gratuito (M0 - Free)');
console.log('4. Configura un usuario de base de datos');
console.log('5. Configura el acceso de red (Allow Access from Anywhere)');
console.log('6. Obtén la URL de conexión');
console.log('');

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const setupMongoDB = async () => {
  try {
    console.log('🔗 ¿Tienes tu URL de conexión de MongoDB Atlas?');
    const hasUrl = await askQuestion('Responde "si" o "no": ');
    
    if (hasUrl.toLowerCase() === 'si' || hasUrl.toLowerCase() === 's') {
      console.log('\n📝 Ingresa tu URL de conexión de MongoDB Atlas:');
      console.log('Ejemplo: mongodb+srv://usuario:password@cluster.mongodb.net/database');
      
      const mongoUrl = await askQuestion('URL: ');
      
      if (!mongoUrl.includes('mongodb+srv://')) {
        console.log('❌ Error: La URL debe comenzar con "mongodb+srv://"');
        rl.close();
        return;
      }
      
      // Leer el archivo .env actual
      let envContent = '';
      const envPath = path.join(__dirname, '.env');
      
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
      }
      
      // Actualizar o agregar MONGO_URI
      if (envContent.includes('MONGO_URI=')) {
        envContent = envContent.replace(
          /MONGO_URI=.*/,
          `MONGO_URI=${mongoUrl}`
        );
      } else {
        envContent += `\n# MongoDB Atlas\nMONGO_URI=${mongoUrl}\n`;
      }
      
      // Escribir el archivo .env actualizado
      fs.writeFileSync(envPath, envContent);
      
      console.log('\n✅ URL de MongoDB Atlas configurada correctamente!');
      console.log('\n🧪 Ahora puedes probar la conexión:');
      console.log('   npm start');
      console.log('   npm run create-admin');
      console.log('   npm test');
      
    } else {
      console.log('\n📚 Guía paso a paso:');
      console.log('');
      console.log('1. 🌐 Ve a https://www.mongodb.com/atlas');
      console.log('2. 📝 Crea una cuenta gratuita');
      console.log('3. 🏗️  Crea un cluster gratuito (M0 - Free)');
      console.log('4. 👤 En "Database Access", crea un usuario:');
      console.log('   - Username: backend-user');
      console.log('   - Password: TuPasswordSeguro123');
      console.log('   - Privileges: Read and write to any database');
      console.log('5. 🌍 En "Network Access", agrega:');
      console.log('   - IP Address: 0.0.0.0/0 (Allow Access from Anywhere)');
      console.log('6. 🔗 En "Database" > "Connect" > "Connect your application"');
      console.log('   - Copia la URL de conexión');
      console.log('');
      console.log('📖 Consulta el archivo MONGODB_SETUP.md para más detalles');
      console.log('');
      console.log('🔄 Cuando tengas la URL, ejecuta este script nuevamente:');
      console.log('   node setup_mongodb.js');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    rl.close();
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  setupMongoDB();
}

module.exports = { setupMongoDB }; 