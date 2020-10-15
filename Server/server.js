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

app.get('/api/pictures/:hotel', (req, res) => {
  let data = req.params.hotel;
  Hotel.find({ name: data})
  .then((results) => {
    res.send(results);
  })
})

app.get('/api/hotels', ( req, res ) => {
  Hotel.find({})
  .then( (result) => {
    res.send(result);
  })
})

app.post('/', ( req, res ) => {
  Hotel.create(req.body)
  .then( function(result) {
    res.send(result);
  })
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
})