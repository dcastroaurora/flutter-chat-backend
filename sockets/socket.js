const { io } = require('../index');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Hay Clientes conectados');

    client.on('disconnect', () => {
        console.log('Se desconectaron clientes');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });
});
