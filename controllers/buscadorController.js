var rp = require('request-promise');
const fs = require('fs');

function obtenerBusqueda(consulta) {
    var options = {
        uri: `https://api.duckduckgo.com/?q=${ consulta }&format=json&kl=ar-es&kz=1`,
        json: true // Automatically parses the JSON string in the response
    };

    var busqueda = rp(options);

    return busqueda;
}

module.exports = obtenerBusqueda;