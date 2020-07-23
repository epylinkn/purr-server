const path = require('path')
const express = require('express')
const app = express()
const config = require('./config')
const PORT = config.PORT

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { foo: 'bar' })
})

app.get('/api/cats', (req, res) => {
  res.json([
    'Ari Fancybeast',
    'Tama Hornpoopsie',
    'Swift Celestial',
  ])
})

const server = require('http').createServer(app).listen(PORT, function() {
  console.log('Server listening at port: ', PORT);
});

// SOCKETS STUFF
let io = require('socket.io').listen(server)

io.on('connection', function (socket) {
  console.log('We have a new client: ' + socket.id)

  socket.on('disconnect', function () {
    io.sockets.emit('disconnected', socket.id)
  })

  socket.on('pet', function (isPet) {
    console.log('received a pet event from', socket.id)

    io.socket.emit('pet', { id: socket.id })
  })
})
