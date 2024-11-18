  // Importar mongoose para interactuar con MongoDB
const mongoose = require('mongoose');

// Función para conectar a la base de datos de MongoDB de manera asincrónica
const connectDB = async () => {
  try {
    // Intentamos conectarnos a MongoDB usando mongoose con la URI de conexión
    const db = await mongoose.connect("mongodb://localhost/libros");
    
    // Si la conexión es exitosa, mostramos un mensaje con el nombre del host de la conexión
    console.log(`Conectado a MongoDB en ${mongoose.connection.host}`);
  } catch (error) {
    // Si ocurre un error durante la conexión, lo capturamos y mostramos un mensaje de error
    console.log(`Error al conectar con MongoDB: ${error}`);
  }
};

// Exportamos la función connectDB para poder utilizarla en otros archivos
module.exports = connectDB;
