const { userConnected, userDisconnected, saveMessage } = require('../controllers/socket');
const { checkJWT } = require('../helpers/jwt');
const { io } = require('../index');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Hay Clientes conectados');

    const [valid, uid] = checkJWT(client.handshake.headers['x-token']);

    //Verifica autenticación
    if(!valid) return client.disconnect();

    //Cliente autenticado
    userConnected(uid);

    //Ingresar al usuario a una sala especifica => Global | client.id | uid
    client.join(uid);

    //Escuchar del cliente el mensaje-personal
    client.on('personal-message',async (payload)=>{
        console.log('lolll',payload);
        await saveMessage(payload);
        io.to(payload.to).emit('personal-message', payload);
    });

    client.on('disconnect', () => {
        console.log('Se desconectaron clientes');
        userDisconnected(uid);
    });
});
