const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/e-commerce', {
  useNewUrlParser: true, // To parse MongoDB connection strings
  useUnifiedTopology: true, // To use the new Server Discovery and Monitoring engine
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
