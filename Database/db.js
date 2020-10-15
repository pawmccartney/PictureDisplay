const mongoose = require('mongoose');
const uri = 'mongodb://localhost/4000';

const db = mongoose.connect(uri,  { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = db;
