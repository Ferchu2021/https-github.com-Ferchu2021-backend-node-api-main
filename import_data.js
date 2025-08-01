const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// Modelo de Usuario (si no existe, lo creamos)
const usuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    productos: String,
    categoria: String,
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true });

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Función para leer CSV
const parseCSV = (csvContent) => {
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
            const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            data.push(row);
        }
    }
    
    return data;
};

// Función principal de importación
const importData = async () => {
    try {
        console.log('🔗 Conectando a MongoDB Atlas...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conexión exitosa a MongoDB');
        
        // Verificar si el archivo existe
        const csvPath = path.join(__dirname, 'usuarios_productos.csv');
        if (!fs.existsSync(csvPath)) {
            console.log('❌ Archivo usuarios_productos.csv no encontrado');
            console.log('📝 Creando archivo de ejemplo...');
            
            // Crear archivo de ejemplo
            const exampleData = `nombre,email,productos,categoria
Juan Pérez,juan@ejemplo.com,Laptop Gaming,Electrónicos
María García,maria@ejemplo.com,Smartphone,Electrónicos
Carlos López,carlos@ejemplo.com,Libros,Educación
Ana Rodríguez,ana@ejemplo.com,Ropa Deportiva,Deportes`;
            
            fs.writeFileSync(csvPath, exampleData);
            console.log('✅ Archivo de ejemplo creado: usuarios_productos.csv');
        }
        
        // Leer el archivo CSV
        const csvContent = fs.readFileSync(csvPath, 'utf8');
        const data = parseCSV(csvContent);
        
        console.log(`📊 Datos encontrados: ${data.length} registros`);
        
        // Limpiar colección existente (opcional)
        const clearCollection = process.argv.includes('--clear');
        if (clearCollection) {
            await Usuario.deleteMany({});
            console.log('🗑️  Colección limpiada');
        }
        
        // Insertar datos
        const results = await Usuario.insertMany(data);
        console.log(`✅ ${results.length} registros importados exitosamente`);
        
        // Mostrar algunos registros
        console.log('\n📋 Primeros 3 registros importados:');
        results.slice(0, 3).forEach((user, index) => {
            console.log(`   ${index + 1}. ${user.nombre} - ${user.email}`);
        });
        
        console.log('\n🎉 Importación completada exitosamente!');
        
    } catch (error) {
        console.error('❌ Error durante la importación:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Desconectado de MongoDB');
    }
};

// Ejecutar importación
importData(); 