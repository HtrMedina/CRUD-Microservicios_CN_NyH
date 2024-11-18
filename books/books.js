const express = require('express');
const path = require('path');
const app = express();
const db = require('./config/mongoose');
db();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", require("./routes"));

app.listen(8000, (err) => {
    if(err){
        console.log("Error al conectar el servidor", err);
    }
    console.log("Servidor activo en puerto 8000");
});

app.get("/", async (req, res) => {
    try {
        const books = await Books.find(); 
        res.render('home', { books: books });  
    } catch (error) {
        res.status(500).send("Error al obtener los libros");
    }
});
