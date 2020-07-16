const fs = require('fs');

const { Client } = require('whatsapp-web.js');

const client = require('./conexionWhatsapp'); 

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
        })
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