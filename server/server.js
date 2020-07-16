require('./config/config');

const express = require('express');
const fs = require('fs');

const { Client } = require('whatsapp-web.js');
const client = require('../controllers/funciones');

const app = express();

client.initialize();


app.listen(process.env.PORT, () => {
    console.log('Esuchando el puerto: ', process.env.PORT);
})