const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./connection.js');
const authRoutes = require('./authenticationRoute');
const drawingRoutes = require('./drawingroutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('draw', (pathData) => {
    socket.broadcast.emit('draw', pathData);
  });

  socket.on('chatMessage', (message) => {
    io.emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3001;

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/drawings', drawingRoutes);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
