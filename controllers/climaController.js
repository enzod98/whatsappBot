var rp = require('request-promise');
const client = require('./conexionWhatsapp');

const getClima = async(emisor, direccion) => {
    try {

        //lo primero que debemos hacer es encontrar las coordenadas de la ciudad solicitada
        let coordenadas = await getLugar(direccion);

        //una vez encontradas las coordenadas procedemos a encontrar la temperatura actual
        let temperatura = await getTemperatura(coordenadas.lat, coordenadas.lon);

        //enviamos el mensaje con nuestro resultado
        client.sendMessage(emisor, `La temperatura de ${ coordenadas.ciudad } es de ${ temperatura }ºC`);

    } catch (err) {

        client.sendMessage(emisor, 'No se pudo encontrar el clima de ' + 'direccion')
        console.log(err);
    }
}

const getLugar = async(direccion) => {
    var options = {
        uri: `https://geocode.xyz/?scantext=${direccion}&geoit=JSON`,
        json: true // Automatically parses the JSON string in the response
    };

    const resultado = await rp(options);

    if (resultado.match.length === 0) {
        throw new Error(`No hay resultados para ${ direccion }`)
    }

    var lat = resultado.match[0].latt;
    var lon = resultado.match[0].longt
    var ciudad = resultado.match[0].location;

    return {
        lat,
        lon,
        ciudad
    }
}

const getTemperatura = async(lat, lon) => {

    var options = {
        uri: `https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }&units=metric&appid=f322cbac77e379d1ef50ceb8ad6b4caf`,
        json: true // Automatically parses the JSON string in the response
    };

    const resultado = await rp(options);

    //console.log(resultado);

    return resultado.main.temp

}

module.exports = {
    getClima
}