const mongoose = require('mongoose');
mongoose.connect('mongodb://10.0.0.10/ducthanh3');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connected");
});