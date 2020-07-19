const fs = require('fs');

const { Client } = require('whatsapp-web.js');

const client = require('./conexionWhatsapp');

const getBusqueda = require('./buscadorController');

const getClima = require('./climaController').getClima;

client.on('ready', () => {
    console.log('Conexión realizada con éxito!');
    /*setInterval(() => {
        client.sendMessage(`123456789@c.us`, "I'm alive");
        console.log('mensaje enviado');
    }, 60000);*/

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

                //descomponemos el mensaje para detectar el comando y la consulta
                let mensajeDescompuesto = message.body.split(' ');
                let comandoIngresado = mensajeDescompuesto[0].toLocaleLowerCase();

                //borramos del array el primer elemento que vendría a ser el comando
                mensajeDescompuesto.splice(0, 1);
                let consulta = mensajeDescompuesto.join(' ');
                consulta = encodeURI(consulta);
                /*let consulta = "";
                for (var i = 1; i < mensajeDescompuesto.length; i++) {
                    consulta += mensajeDescompuesto[i];
                    if (i != mensajeDescompuesto.length - 1) {
                        consulta += " ";
                    }
                }*/

                switch (comandoIngresado) {
                    case "buscar":
                        getBusqueda(message.from, consulta);
                        //client.sendMessage(message.from, 'Quieres hacer una busqueda parece');
                        break;

                    case "clima":
                        getClima(message.from, consulta);
                        break;

                    default:
                        client.sendMessage(message.from, 'Comandos:\nBuscar: realiza una búsqueda rápida en internet\nClima: Realiza la búsqueda del clima de la ciudad solicitada');
                        break;
                }
            }

        )
        .catch(error => {
            console.log(error);
        });

    /*if(message.from.split('-').length <= 1 ){
        console.log("¡NUEVO MENSAJE PRIVADO!");
    } else{
        console.log("¡NUEVO MENSAJE DE GRUPO!");
    }*/

    let mensajeInt = parseInt(message.body, 10);

    if (mensajeInt >= 0 && mensajeInt <= 10) {
        client.sendMessage(message.from, 'Gracias por participar de la encuesta!');
    }
});


//acciones que se realizarán al ingresar a un grupo
client.on('group_join', data => {
    //el data es de tipo GroupNotification
    client.sendMessage(data.id.remote, 'Hola mundo!')

});


module.exports = client;