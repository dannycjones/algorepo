var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  username: String,
  seeded: { type: Boolean, default: false }
}, {
  timestamps: true
});

const User = mongoose.model('User', schema);

export default User;
