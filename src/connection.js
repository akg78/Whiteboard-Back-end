const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ankitkumarkumar680:5nxSYtIwZIe3Vjyw@whiteboard78.qqxdu.mongodb.net/?retryWrites=true&w=majority&appName=Whiteboard78', {
    //   useNewUrlParser: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
