var rp = require('request-promise');
const client = require('./conexionWhatsapp');

const getBusqueda = async(emisor, consulta) => {
    try {
        var options = {
            uri: `https://api.duckduckgo.com/?q=${ consulta }&format=json&kl=ar-es&kz=1`,
            json: true // Automatically parses the JSON string in the response
        };

        await rp(options).then(result => {
            //console.log(result);
            client.sendMessage(emisor, result.AbstractText);
        }).catchReturn;

        //console.log(busqueda);

    } catch (error) {
        client.sendMessage(emisor, `No se pudo obtener ningún resultado`);
    }

}

module.exports = getBusqueda;