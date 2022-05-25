const express = require('express');
const {Server : ioServer} = require('socket.io');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const app = express();
const PORT = 8080
const routesProducts = require('./routes/products')

const httpServer = http.createServer(app)
const io = new ioServer(httpServer)

// Midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname +'views'))


app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs')


app.use('/api/productos', routesProducts)

app.get('/', (req, res) => {
    res.render('index');
})


try {
    app.listen(PORT);
    console.log(`Server on port ${PORT}...`)
} catch (error) {
    console.log('Error de conexión con el servidor...', error)
}


const messages = []

// Nuevo Servidor websocket
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado', socket.id)
    socket.emit('messages', messages)

    //Nuevo mensaje
    socket.on("newMessage", message => {
        messages.push(message)
        io.sockets.emit('messages', messages)
    })
})