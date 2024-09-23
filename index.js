const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./src/connection');
const authRoutes = require('./src/authenticationRoute');
const drawingRoutes = require('./src/drawingroutes');


const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/drawings', drawingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
