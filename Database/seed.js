const mongoose = require('mongoose');
const db = require('./db.js');
const faker = require('faker');
const _ = require('underscore');
const uri = 'mongodb://localhost/4000';
const Hotel = require('./Photo.js');

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  mongoose.connection.dropDatabase()
});

const saveOneHotel = (hotel) => {
  return new Promise((resolve, reject) => {
    Hotel.create(hotel, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const seed = () => {
  let hotels = [];

  for (let i = 0; i < 100; i++) {
    let pictures = [];
    let thumbnailArray = [];
    let fullSizeArray = [];
    let mainImgSizeArray = [];
    let userArray = [];
    let hotelObj = {};
    let arrayOfRandom = [];

    while (arrayOfRandom.length < 24) {
      arrayOfRandom = getRandomNumberArray();
    }

    hotelObj.tags = [];
    while (hotelObj.tags.length < 3) {
      hotelObj.tags = getTagsArray();
    }

    let length = arrayOfRandom.length;

    hotelObj.name = 'hotel' + i;

    for (let x = 1; x <= length; x++) {
      let imageNum = arrayOfRandom.pop();
      let image = {};

      // === OLD AWS LINKS ===
      // image.imgMainUrl = `https://tripadcoba.s3-us-west-1.amazonaws.com/main${imageNum}.jpg`;
      // image.imgFullUrl = `https://tripadcoba.s3-us-west-1.amazonaws.com/full${imageNum}.jpg`;
      // image.imgThumbUrl = `https://tripadcoba.s3-us-west-1.amazonaws.com/thumb${imageNum}.jpg`;
      // mainImgSizeArray.push(`https://tripadcoba.s3-us-west-1.amazonaws.com/main${imageNum}.jpg`);
      // fullSizeArray.push(`https://tripadcoba.s3-us-west-1.amazonaws.com/full${imageNum}.jpg`);
      // thumbnailArray.push(`https://tripadcoba.s3-us-west-1.amazonaws.com/thumb${imageNum}.jpg`);

      // https://hrr48sdc.s3-us-west-1.amazonaws.com/business-${imageNum}.jpg

      image.imgMainUrl = 'https://hrr48sdc.s3-us-west-1.amazonaws.com/hotel1_main.jpeg';
      image.imgFullUrl = 'https://hrr48sdc.s3-us-west-1.amazonaws.com/hotel1_full.jpeg';
      image.imgThumbUrl = 'https://hrr48sdc.s3-us-west-1.amazonaws.com/hotel1_thumb.jpeg';
      mainImgSizeArray.push('https://hrr48sdc.s3-us-west-1.amazonaws.com/hotel1_main.jpeg');
      fullSizeArray.push('https://hrr48sdc.s3-us-west-1.amazonaws.com/hotel1_full.jpeg');
      thumbnailArray.push('https://hrr48sdc.s3-us-west-1.amazonaws.com/hotel1_thumb.jpeg');

      image.uploadDate = new Date();
      image.user = faker.name.firstName() + faker.name.lastName();
      userArray.push(image.user);
      image.hotel = hotelObj.name;
      image.tag = hotelObj.tags[Math.floor(Math.random() * hotelObj.tags.length - 1)];

      pictures.push(image);
    }

    hotelObj.FullPhotos = fullSizeArray;
    hotelObj.MainPhotos = mainImgSizeArray;
    hotelObj.ThumbnailPhotos = thumbnailArray;
    hotelObj.users = userArray;
    hotelObj.photoObjects = pictures;
    hotels.push(saveOneHotel(hotelObj));
  }


  Promise.all(hotels)
  .then(result => {
    mongoose.connection.close();
  })
  .catch((err) => {
    throw err;
  })
}

const getTagsArray = () => {
  let tags = ['dogs', 'beach', 'sunshine', 'Wonderful', 'Good Food', 'happy', 'sandwich', 'beach life', 'Perfection', 'Okay', 'Passable', 'Overpriced', 'Meh', 'Too Sunny', 'Glaringly Beautiful'];
  let tagsNum = Math.floor(Math.random() * (tags.length - 1));
  let tagsNumArray = [];
  for (let i = 0; i < tagsNum; i++) {
    tagsNumArray.push(Math.floor(Math.random() * tags.length));
  }
  tagsForThisHotel = tagsNumArray.map((number) => {
    return tags[number];
  })
  return _.uniq((tagsForThisHotel));
};

const getRandomNumberArray = () => {
  let randNum = (25 + Math.random() * (58 - 25));
  let totalNumberOfPictures = Array.from(Array(58).keys());
  let arrayOfRandom = totalNumberOfPictures.map((nothing, index) => {
  let randNum = (Math.floor(Math.random() * 58 + 1));
    return randNum;
  });
  arrayOfRandom = _.uniq((arrayOfRandom));

  return arrayOfRandom;
}

seed();

module.exports = saveOneHotel;

