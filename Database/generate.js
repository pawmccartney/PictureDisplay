const faker = require('faker');
const fs = require('fs');
const path = require('path');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

    const csvWriter = createCsvWriter({
      path: 'hotels.csv',
      header: [
        {id: 'name', title: 'name'},
        {id: 'fullPhotos', title: 'FullPhotos'},
        {id: 'mainPhotos', title: 'mainPhotos'},
        {id: 'thumbnailPhotos', title: 'thumbnailPhotos'},
        {id: 'users', title: 'users'},
        {id: 'tags', title: 'tags'}
      ]
    });

let tags = ['dogs', 'beach', 'sunshine', 'Wonderful', 'Good Food', 'Classy', 'Sandwiches', 'beach life', 'Perfection', 'Okay', 'Passable', 'Overpriced', 'Meh', 'Too Sunny', 'Glaringly Beautiful'];

// ===== returns an array of tags ======
const getTags = function(array, num) {
  let result = [];

  for (var i = 0; i < num; i++) {
    result.push(tags[getRandomInt(2, 14)])
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



// ===== writes hotel records to CSV file ======
const generate = async (number) => {
  let data = [];
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










    data.push(hotel);
    console.log(hotel);
    console.log('Writing... - ' + i + ' out of ' + numOfRecords + ' completed');
  }
  csvWriter.writeRecords(data)       // returns a promise
      .then(() => {
          console.log('...Done');
      });
}

let numOfRecords = 10;

generate(numOfRecords);



// for (let i = 0; i < 1e6; i++) { >>> LOOP
//     const ableToWrite = fileWriteStream.write(`.testClass${itr}-${i%2} { background: red } \n`); >>> CAN CONTINUE VAR
//     if (!ableToWrite) { >>> IF CANT CONTINUE
//         await new Promise(resolve => { >>> AWAIT PROMISE
//             fileWriteStream.once('drain', resolve); >>> DRAIN
//         });
//     }
// }




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
//           "USER1", "USER2"
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
