const express = require('express');
const path = require('path');
const WebSocket = require('ws');
let server = require('http').createServer();

const app = express();
const port = 8080;
const wsOutputClients = new WebSocket.Server({ server });
const wsInputClients = new WebSocket.Server({ port: 8081 });


app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
server.on('request', app);

app.get('/', (req, res) => {
    res.render('index');
});


server.listen(port, () => {
    console.log('Example app listening at http://localhost:' + port);
});

wsOutputClients.on('connection', ws => {
    ws.binaryType = 'arraybuffer';
    ws.send('Connected')
    console.log('output client connected');
})

wsInputClients.on('connection', ws => {
    ws.binaryType = 'arraybuffer';
    console.log('input client connected');
    ws.on('message', function incoming(jpgChunk) {
        broadcastToClients(wsOutputClients, jpgChunk);
    });
})

function broadcastToClients(socket, bufferData) {
    if (socket.clients.size) {
        socket.clients.forEach(client => {
            client.send(bufferData);
        });
    }

}

