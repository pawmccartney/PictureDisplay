const Photo = require('./Photo.js');
var mongoose = require('mongoose');


Photo.collection.deleteMany({})
  .then(() => {
    mongoose.disconnect();
  })



console.log('DB DELETED');

