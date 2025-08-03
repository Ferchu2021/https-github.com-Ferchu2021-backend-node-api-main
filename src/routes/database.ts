import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        if (!process.env['MONGO_URI']) {
            throw new Error('MONGO_URI no está definida en las variables de entorno');
        }
        await mongoose.connect(process.env['MONGO_URI']);
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error);
        process.exit(1);
    }
};