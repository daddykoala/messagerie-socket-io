//modules
const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const http = require('http');
const socketio = require('socket.io');

//variable globale
const app = express();
const server = http.Server(app);
const io = socketio(server);
const port = config.express.port;
let options = {
    root: __dirname + '/views'
}
let usernames = [];

//middlewares
app.use(express.static(options.root))
app.use(morgan('dev'));

//route

app.get('/home', (req, res) => {
    console.log(req.hostname);
    res.sendFile('index.html', options);
});

app.get('/params/:name', (req, res) => {
    res.hello('req.params.name')
});

//io
io.on("connection", (socket) => {
    console.log('user connected' + socket.id);

    // setTimeout(() => {
    //     socket.emit('hi', 'bonjour')
    // }, 1000);

    // socket.on('hi', (msg) => {
    //     console.log(`client says ${msg}!`);
    // })
    //traitement
    socket.on('setUsername', (userNameLog) => {

        //traitemement de la chaine de caractere 
        userNameLog = userNameLog.trim();

        //verification de l'unicité de l'user
        let userNameExist = false;

        usernames.map((userName) => {
            if (userName == userNameLog);
            userNameExist = true;
        })
        //traitement final
        if (userNameExist){

            console.log('rejet');
            socket.emit('rejectUsername');
           

        }else {

            console.log('accepter');
            usernames.push(userNameLog);
            socket.emit('acceptUsername')
        }
          console.table(usernames)  


    })

    socket.on('disconnect', () => {
        console.log('disconnected' + socket.id);

    })
});

server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/home`);
});