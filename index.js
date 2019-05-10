const express = require('express');
const morgan = require('morgan');
const app = express();
var bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
var fs = require('fs');
const jwt = require('jsonwebtoken');
//mongo
mongoose.connect('mongodb://localhost:27017/Tienda', { useNewUrlParser: true })
    .then(() => {
        console.log('Conectado');
    })
    .catch(err => {
        console.log('Error: ', err);
    });


app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});

    }
    next();
});


// settings
var po = path.dirname(__filename);
const publicPath = path.resolve(po + '/frontend');

app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'));


// routes
app.use(require('./src/routes'));
app.use('/api/login', require('./src/routes/login'));
app.use('/api/Tienda', require('./src/routes/Tienda'));
app.use('/api/Perfiles', require('./src/routes/perfiles'));
app.use(express.static(publicPath));

app.listen(app.get('port'), async() => {

    //const usuario = await m.findByIdAndDelete({ _id: '5cd3836acd96342a64e5f36c' });
    //console.log(usuario);

    console.log(`Server on port ${app.get('port')}`);
});