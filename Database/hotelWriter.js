const faker = require('faker');
const fs = require('fs');



// ==== HELPERS ====
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



const writeHotels = fs.createWriteStream('hotels.csv');
writeHotels.write('name,fullPhotos,mainPhotos, thumbnailPhotos, users, tags\n', 'utf8');



function writeAllHotels(writer, encoding, callback) {
  let i = 100;
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
      let tagString = getTags(tagList, getRandomInt(3, 5));
      let tags = tagString;

      const data = `hotel${id},${fullPhotos},${mainPhotos},${thumbnailPhotos}, ${users}, ${tags}\n`;

      console.log('writing...')
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

writeAllHotels(writeHotels, 'utf-8', () => {
  writeHotels.end();
});
