const { Router } = require('express');
const router = new Router();
const bcrypt = require("bcrypt");
let mongo = require('../../mongodb.js');
const jwt = require('jsonwebtoken');
router.get('/', (req, res) => {
    //res.json(key);
});

router.post('/', async(req, res) => {
    var { Email, password } = req.body;
    if (Email) {
        const esp = await mongo.find({ email: Email });

        const saltRounds = 10;
        const hashedid = await new Promise((resolve, reject) => {
            bcrypt.hash(esp[0]._id + "", saltRounds, function(err, hash) {
                if (err) reject(err)
                resolve(hash);
            });
        });
        if (esp.length == 1) {
            const iguales = await new Promise((resolve, reject) => {
                bcrypt.compare(password, esp[0].clave, function(err, hash) {
                    if (err) reject(err);
                    resolve(hash);
                });
            });
            if (iguales ) {
                res.status(200).json([{ idUsuario: hashedid }]);
            } else {
                res.status(500).json({ error: 'Datos incorrectos.' });
            }
        } else {
            res.status(500).json({ error: 'No se Encontro al Usuario' });
        }
    } else {
        res.status(500).json({ error: 'Datos incorrectos.' });
    }
});

router.post('/token', async(req, res) => {
    var { Token } = req.body;
    var tkn = jwt.decode(Token);
console.log(tkn);

    const esp = await mongo.find({ email: tkn.email, Nombre: tkn.pass });
    if (esp.length == 1) {
        const saltRounds = 10;
        const hashedid = await new Promise((resolve, reject) => {
            bcrypt.hash(esp[0]._id + "", saltRounds, function(err, hash) {
                if (err) reject(err)
                resolve(hash);
            });
        });
        res.status(200).json([{ idUsuario: hashedid }]);
    } else {
        res.status(500).json({ error: 'Token Incorrecto' });
    }
});

module.exports = router;