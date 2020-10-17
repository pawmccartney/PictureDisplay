const faker = require('faker');



let tags = ['dogs', 'beach', 'sunshine', 'Wonderful', 'Good Food', 'Classy', 'Sandwiches', 'beach life', 'Perfection', 'Okay', 'Passable', 'Overpriced', 'Meh', 'Too Sunny', 'Glaringly Beautiful'];

// ===== returns an array of tags ======
const getTags = function(array, num) {
  let result = [];

  for (var i = 0; i < num; i++) {
    result.push(tags[getRandomInt(2, 14)])
  }

  return result;
}

// ==== Random Num Generator =====
var getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}




// ===== generates hotel objects ======
const generate = function(number) {
  var hotels = [];

  for (var i = 0; i <= number; i++) {
    var hotel = {};
    var imgId = getRandomInt(1, 30);
    var currentTags = getTags(tags, getRandomInt(3, 5));

    hotel.name = "hotel" + i;
    hotel.users = [faker.name.firstName() + faker.name.lastName()];
    hotel.tags = currentTags;

    // asigns one main image to current hotel object
    hotel.FullPhotos = `https://hrr48sdc.s3-us-west-1.amazonaws.com/business-${imgId}.jpg`;
    hotel.MainPhotos = `https://hrr48sdc.s3-us-west-1.amazonaws.com/mainbusiness-${imgId}.jpg`;
    hotel.ThumbnailPhotos = `https://hrr48sdc.s3-us-west-1.amazonaws.com/thumbbusiness-${imgId}.jpg`;

    hotel.photoObjects = [];

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

    // ==== pushes 24 photo objects to current hotel's photo Object array ====
    for (var j = 0; j <= 23; j++) {
      hotel.photoObjects.push(photoObjGenerator());
    }


    hotels.push(hotel);
  }


  console.log(hotels);
  return hotels;
}

generate(10);

// ===== Below is an example of what the Client expects =====
// [
//   {
//       "FullPhotos": [
//           "http://placecorgi.com/1200/1000"
//       ],
//       "MainPhotos": [
//           "http://placecorgi.com/600/400"
//       ],
//       "ThumbnailPhotos": [
//           "http://placecorgi.com/60/50"
//       ],
//       "users": [
//           "UPDATED USER"
//       ],
//       "tags": [
//           "dogs",
//           "beach"
//       ],
//       "photoObjects": [
//           {
//               "imgFullUrl": "http://placecorgi.com/1200/1000",
//               "imgMainUrl": "http://placecorgi.com/600/400",
//               "imgThumbUrl": "http://placecorgi.com/60/50",
//               "user": "TestUser",
//               "hotel": "TEST HOTEL",
//               "tag": "dogs"
//           }
//       ],
//       "_id": "5f890eb45ac9734a61631a20",
//       "name": "hotel0",
//       "__v": 0
//   }
// ]
