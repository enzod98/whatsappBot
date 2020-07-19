const fs = require('fs');

const { Client } = require('whatsapp-web.js');

const client = require('./conexionWhatsapp');

const getBusqueda = require('./buscadorController');

const getClima = require('./climaController').getClima;

client.on('ready', () => {
    console.log('Conexión realizada con éxito!');

});

//acciones a realizar al recibir un mensaje
client.on('message', message => {

    message.getChat()
        .then(promesaChat => promesaChat)
        .then(chat => {
                var remitente = chat.name;
                console.log("\n========================");
                //console.log(chat);
                if (chat.isGroup) {
                    console.log(`¡NUEVO MENSAJE DEL GRUPO ${remitente.toUpperCase()} !`);

                } else {
                    console.log(`¡NUEVO MENSAJE PRIVADO DE ${remitente.toUpperCase()} !`);
                }
                console.log("========================");

                console.log("Mensaje: ", message.body);


                var listaComandos = ["buscar", "clima"];

                //descomponemos el mensaje para detectar el comando y la consulta
                let mensajeDescompuesto = message.body.split(' ');
                let comandoIngresado = mensajeDescompuesto[0].toLocaleLowerCase();

                if (listaComandos.indexOf(comandoIngresado) < 0) {
                    enviarComandos(message.from);
                }

                //borramos del array el primer elemento que vendría a ser el comando
                mensajeDescompuesto.splice(0, 1);
                let consulta = mensajeDescompuesto.join(' ');
                consulta = encodeURI(consulta);

                switch (comandoIngresado) {
                    case "buscar":
                        getBusqueda(message.from, consulta);
                        break;

                    case "clima":
                        getClima(message.from, consulta);
                        break;

                }
            }

        )
        .catch(error => {
            console.log(error);
        });
});


//acciones que se realizarán al ingresar a un grupo
client.on('group_join', data => {
    //el data es de tipo GroupNotification
    //client.sendMessage(data.id.remote, 'Hola mundo!');
    enviarComandos(data.id.remote);

});


function enviarComandos(emisor){
    client.sendMessage(emisor,
        "\t======LISTA DE COMANDOS======\n\n" +
        "Buscar: Realiza una búsqueda rápida en internet\nEjemplo: 'Buscar Fallout'\n\n" +
        "Clima: Realiza la búsqueda del clima de la ciudad solicitada\nEjemplo: 'Clima Asuncion'");
}


module.exports = client;