const express = require('express');
const path = require('path');
require('dotenv').config();

//DB Config
const { dbConnection } = require('./database/config');
dbConnection();

// App de Express
const app = express();

// Read and body parse
app.use(express.json());


// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

//My Routes
app.use('/api/login', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/message', require('./routes/message'));

server.listen( process.env.PORT, ( err ) => {
    if ( err ) throw new Error(err);
    console.log('Servidor corriendo en puerto', process.env.PORT );
});


