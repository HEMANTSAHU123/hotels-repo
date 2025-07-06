const mongoose = require('mongoose');


const mongourl = 'mongodb://localhost:27017/hotels';


mongoose.connect(mongourl)
  .then(() => {
    console.log('Successfully connected to MongoDB server');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const db = mongoose.connection;


db.on('connected', () => {
  console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
  console.error('MongoDB connection error event:', err); // Use console.error for errors
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Export the connection object
module.exports = db;