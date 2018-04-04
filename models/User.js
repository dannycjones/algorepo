import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const schema = new Schema({
  name: String,
  seeded: { type: Boolean, default: false }
}, {
  timestamps: true
});
schema.plugin(passportLocalMongoose);

const User = mongoose.model('User', schema);

export default User;
