const mongoose = require('mongoose');
const db = require('./db.js');

const HotelsSchema = new mongoose.Schema({
  name: String,
  FullPhotos: Array,
  MainPhotos: Array,
  ThumbnailPhotos: Array,
  users: Array,
  tags: Array,
  photoObjects: Array
});

const Hotel = mongoose.model('Hotel', HotelsSchema);

module.exports = Hotel;

var test = {
  "name": "hotel0",
  "FullPhotos": ["http://placecorgi.com/1200/1000"],
  "MainPhotos": ["http://placecorgi.com/600/400"],
  "ThumbnailPhotos": ["http://placecorgi.com/60/50"],
  "users": ["TestUser"],
  "tags": ["dogs", "beach"],
  "photoObjects": [{
    "imgFullUrl": "http://placecorgi.com/1200/1000",
    "imgMainUrl": "http://placecorgi.com/600/400",
    "imgThumbUrl": "http://placecorgi.com/60/50",
    "uploadDate": {},
    "user": "TestUser",
    "hotel": "TEST HOTEL",
    "tag": "dogs"
  }]
};

