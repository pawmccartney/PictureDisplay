const faker = require('faker');
const fs = require('fs');

// ====== HELPER FUNCTIONS =========

let tagList = ['dogs', 'beach', 'sunshine', 'Wonderful', 'Good Food', 'Classy', 'Sandwiches', 'beach life', 'Perfection', 'Okay', 'Passable', 'Overpriced', 'Meh', 'Too Sunny', 'Glaringly Beautiful'];


// ===== returns an array of tags ======
const getTags = function(array, num) {
  let result = [];

  for (var i = 0; i < num; i++) {
    result.push(tagList[getRandomInt(2, 14)])
  }

  return result;
}
// ======================================

// ==== Random Num Generator =====
var getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// ===============================

   // ==== Generates a "photoObject" to be pushed into a specific hotel ====
    var photoObjGenerator = function() {
      let result = {};
      let randomImgNum = getRandomInt(1, 30);

      result.user = [faker.name.firstName() + faker.name.lastName()];
      result.tag = hotel.tags[getRandomInt(0, 2)];
      result.hotel = hotel.name;

      result.imgFullUrl = `https://hrr48sdc.s3-us-west-1.amazonaws.com/business-${randomImgNum}.jpg`;
      result.imgMainUrl = `https://hrr48sdc.s3-us-west-1.amazonaws.com/mainbusiness-${randomImgNum}.jpg`;
      result.imgThumbUrl = `https://hrr48sdc.s3-us-west-1.amazonaws.com/thumbbusiness-${randomImgNum}.jpg`;

      return result;
    }

    // ==== CREATES ARRAY OF 24 PHOTO OBJECTS ====
    var arrayOfPhotoObj = function() {
      let result = [];
      for (var j = 0; j <= 23; j++) {
        result.push(photoObjGenerator());
      }
      return result;
    }

    // - imgFullUrl: the full resized image url
    // - imgMainUrl: the main gallery resized image url
    // - imgThumbUrl: the thumbnail resized image url
    // - uploadDate: a Date object at the point which is was uploaded (not currently used though)
    // - user: user name of the person who uploaded the image
    // - hotel: name of hotel associated with the image
    // - tag: tag associated with the hotel, if any


const writePhotos = fs.createWriteStream('PhotoObjects.csv');
writePhotos.write('hotel, imgFullUrl, imgMainUrl, imgThumbUrl, user, tag\n', 'utf8');



function writeAllPhotoObjects(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      let imgId = getRandomInt(1, 30);
      let fullPhotos = `https://hrr48sdc.s3-us-west-1.amazonaws.com/business-${imgId}.jpg`;
      let mainPhotos = `https://hrr48sdc.s3-us-west-1.amazonaws.com/mainbusiness-${imgId}.jpg`;
      let thumbnailPhotos = `https://hrr48sdc.s3-us-west-1.amazonaws.com/thumbbusiness-${imgId}.jpg`;
      let users = faker.name.firstName() + faker.name.lastName();
      let tagString = tagList[getRandomInt(0, 14)];

      const data = `hotel${id},${fullPhotos},${mainPhotos},${thumbnailPhotos}, ${users}, ${tagString}\n`;

      console.log('writing... - ' + i + ' records remaining.')
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

writeAllPhotoObjects(writePhotos, 'utf-8', () => {
  writePhotos.end();
});