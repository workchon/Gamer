const { Router } = require('express');
const router = new Router();
const fs = require('fs');
const bcrypt = require("bcrypt");
let mongo = require('../../mongodb.js');

router.get('/', async(req, res) => {


});

router.post('/', async(req, res) => {


    var { idUsuario } = req.body;
    const esp = await mongo.find({});
    console.log(idUsuario);

    for (x = 0; x < esp.length; x++) {
        console.log(esp[x]._id);
        const iguales = await new Promise((resolve, reject) => {
            bcrypt.compare(esp[x]._id + "", idUsuario + "", function(err, hash) {
                if (err) reject(err);
                resolve(hash);
                console.log(hash);
            });
        }).catch((err) => console.log('caught it'));

        if (iguales) {
            res.status(200).json(esp[x]);
            break;
        }
    }


});
module.exports = router;