const Photo = require('./Photo.js');
var mongoose = require('mongoose');

Photo.find((err, values) => {
  if (err) {
    throw err
    return;
  } else {
  console.log(values);
  mongoose.disconnect();
  }
})