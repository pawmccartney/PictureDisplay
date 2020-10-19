


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