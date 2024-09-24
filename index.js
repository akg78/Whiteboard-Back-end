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


app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://collaborativewhiteboardapp.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Attach Socket.IO to the HTTP server
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://collaborativewhiteboardapp.vercel.app'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Socket.IO connection and events
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle drawing data
  socket.on('draw', (pathData) => {
    console.log("recived the path", pathData)
    socket.broadcast.emit('draw', pathData);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use(bodyParser.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/drawings', drawingRoutes);

// Define the port for the server
const PORT = process.env.PORT || 3001;

// Start the server (for both Express APIs and Socket.IO)
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
