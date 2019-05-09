const { Router } = require('express');
const router = new Router();
const fs = require('fs');
const bcrypt = require("bcrypt");
let mongo = require('../../mongodb.js');

router.get('/', (req, res) => {
    //res.json(Tienda);
});

router.post('/', async(req, res) => {
    const saltRounds = 10;
    var { Nombre, Direccion, NumTel, Email, password, Foto } = req.body;

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) reject(err)
            resolve(hash);
        });
    })
    let ins = new mongo({ email: Email, Nombre: Nombre, Direccion: Direccion, Telefono: NumTel, clave: hashedPassword, foto: Foto, tipoUsuario: "Normal" });
    const esp = await ins.save();
    console.log(esp);
    res.status(200).json({ success: 'Se registro con exito' });

});
module.exports = router;