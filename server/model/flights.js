const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
  arrival: String,
  departure: String,
  time: String
});

const Flight = mongoose.model('Flight', FlightSchema);

module.exports = Flight;