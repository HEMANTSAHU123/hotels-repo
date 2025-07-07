const mongoose = require('mongoose');
require('dotenv').config()
const mongourl=process.env.MONGO_URL;


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
  console.error('MongoDB connection error event:', err); 
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});


module.exports = db;