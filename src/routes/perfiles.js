const { Router } = require('express');
const router = new Router();
const fs = require('fs');
const bcrypt = require("bcrypt");
let mongo = require('../../mongodb.js');

router.get('/', async(req, res) => {
    const esp = await mongo.find({});
    res.status(200).json(esp);
});

router.post('/', async(req, res) => {
    var { idUsuario } = req.body;
    const esp = await mongo.find({});

    for (x = 0; x < esp.length; x++) {
        const iguales = await new Promise((resolve, reject) => {
            bcrypt.compare(esp[x]._id + "", idUsuario + "", function(err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        }).catch((err) => console.log('caught it'));

        if (iguales) {
            res.status(200).json(esp[x]);
            break;
        }
    }
});
router.post('/Upgrade', async(req, res) => {
    var { idUsuario, Codigo } = req.body;
    const esp = await mongo.find({});

    for (x = 0; x < esp.length; x++) {
        const iguales = await new Promise((resolve, reject) => {
            bcrypt.compare(esp[x]._id + "", idUsuario + "", function(err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        }).catch((err) => console.log('caught it'));

        if (iguales) {
            switch (Codigo + '') {
                case 'susano':
                    const upd = await mongo.where({ _id: esp[x]._id }).updateOne({ $set: { tipoUsuario: 'frecuente' } });
                    res.status(200).json({ Upgrade: "Se Actualizo a Cuenta Frecuente" });
                    break;
                case 'sunwukong':
                    const upd2 = await mongo.where({ _id: esp[x]._id }).updateOne({ $set: { tipoUsuario: 'VIP' } });
                    res.status(200).json({ Upgrade: "Se Actualizo a Cuenta VIP" });
                    break;
                default:
                    res.status(500).json({ error: "Ese codigo es Incorrecto" });
                    break;

            }

            break;
        }
    }


});

module.exports = router;