const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./src/connection'); // MongoDB or other DB connection
const authRoutes = require('./src/authenticationRoute');
const drawingRoutes = require('./src/drawingroutes');

// Connect to the database
connectDB();

// Initialize the Express application
const app = express();

// Create an HTTP server and attach the Express app to it
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
const io = new Server(server);


// Socket.IO connection and events
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Broadcast drawing data to all other clients
  socket.on('draw', (pathData) => {
    socket.broadcast.emit('draw', pathData);
  });

  // Broadcast chat messages to all clients
  socket.on('chatMessage', (message) => {
    io.emit('chatMessage', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Middleware for handling API requests
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/drawings', drawingRoutes);

// Define the port for the server
const PORT = process.env.PORT || 3001;

// Start the server (for both Express APIs and Socket.IO)
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});