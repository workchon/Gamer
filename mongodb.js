let mongoose = require('mongoose');
let Usuario = new mongoose.Schema({
    email: String,
    Nombre: String,
    Direccion: String,
    Telefono: String,
    clave: String,
    foto: String,
    tipoUsuario: String
});
module.exports = mongoose.model('Registro', Usuario);