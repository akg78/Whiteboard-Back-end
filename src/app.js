// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const authRoutes = require('./authenticationRoute');
// const drawingRoutes = require('./drawingroutes');

// const app = express();
// const server = http.createServer(app);

// // Socket.io CORS for all localhost origins
// const io = socketIo(server, {
//   cors: {
//     origin: (origin, callback) => {
//       if (!origin || origin.startsWith('http://localhost')) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('draw', (pathData) => {
//     socket.broadcast.emit('draw', pathData);
//   });

//   socket.on('chatMessage', (message) => {
//     io.emit('chatMessage', message);
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// const PORT = process.env.PORT || 3001;


// // Express CORS for all localhost origins
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || origin.startsWith('http://localhost')) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// }));
// app.use(bodyParser.json());
// app.use('/api/auth', authRoutes);
// app.use('/api/drawings', drawingRoutes);

// server.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
