const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  facebookId: String,
  username: String,
  email: String,
  flights: Array,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;