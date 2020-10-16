const express = require('express');
const Hotel = require('./../Database/Photo.js')
const app = express();
const port = 4000;

const bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/../public/'));
app.use('/:hotelId', express.static(__dirname + '/../public/'));
app.use(express.json());

// SERVES DATA TO CLIENT
app.get('/api/pictures/:hotel', (req, res) => {
  let data = req.params.hotel;
  Hotel.find({ name: data})
  .then((results) => {
    res.send(results);
  })
})

// READ ALL HOTELS IN DB
app.get('/api/hotels', ( req, res ) => {
  Hotel.find({})
  .then( (result) => {
    res.send(result);
  })
})

// ADDS A HOTEL TO THE DB
app.post('/api/hotels', ( req, res ) => {
  Hotel.create(req.body)
  .then( function(result) {
    res.send(result);
  })
})

// DB METHOD FOR DELETE
const deleteHotel = function(hotelName, callback) {
  return Hotel.deleteOne(hotelName, (error, result) => {
    if (error) {callback(error)};
    callback(null, result);
  })
};

// DELETES A HOTEL FROM THE DB
app.delete('/api/hotels/:hotelId', (req, res) => {
  deleteHotel({name: req.params.hotelId}, (error, result) => {
    if (error) {
      res.sendStatus(400);
    } else {
      res.status(200).send(result);
    }
  })
})

// MyModel.findOneAndUpdate(query, req.newData, {upsert: true}, function(err, doc) {
//   if (err) return res.send(500, {error: err});
//   return res.send('Succesfully saved.');
// })

const updateHotel = function(hotelName, update, callback) {
  return Hotel.findOneAndUpdate(hotelName, update, function(err, result) {
    if (err) {callback(error)}
    callback(result);
  })
}

app.patch('/api/hotels/:hotelId', function(req, res) {
  updateHotel({name: req.params.hotelId}, req.body, function(err, result) {
    if (err) return res.status(500).send();
    return res.send('Succesfully saved.');
  })
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
})