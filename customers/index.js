const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/mongoose');
db();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use("/", require("./routes"));
app.use(express.static(path.join(__dirname, 'views')));

app.listen(8001, (err) => {
    if(err){
        console.log("Error al conectar el servidor", err);
    }
    console.log("Servidor activo en puerto 8001");
});
