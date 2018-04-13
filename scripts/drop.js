import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || 'mongodb://localhost/main';
const options = {};

async function drop () {
  mongoose.connect(uri, options);

  try {
    await mongoose.connection.dropDatabase();
    console.log('All collections dropped.');
  } catch (e) {
    console.error(e);
  } finally {
    mongoose.connection.close();
  }
}

drop();
