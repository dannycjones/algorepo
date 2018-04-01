import mongoose from 'mongoose';

import User from '../models/User';
import Calculator from '../models/Calculator';

const uri = process.env.MONGODB_URI || 'mongodb://localhost/main';
const options = {};

const users = [
  {
    name: 'Daniel Carl Jones',
    username: 'dannycjones'
  }
];

const calculators = [
  {
    id: 0,
    name: 'Calc 1',
    blocks: [
      { id: 'age', type: 'input', content: { type: 'text', min: 0, max: 200 }, value: 0, label: 'Age' },
      { id: 'weight', type: 'input', content: { type: 'options', display: 'select', options: [{text: '0-10', value: 10}, {text: '11-20', value: 20}] }, label: 'Weight' },
      { id: 'anotherThing', type: 'input', content: { type: 'options', display: 'buttons', options: [1, 2, 3].map(num => { return { text: 'Option ' + num, value: num }; }) }, label: 'My Set Of Buttons' },
      { id: 'subTotal', type: 'result', content: '1 + 2', label: 'My Subtotal', display: false },
      { id: 'endResult', type: 'result', content: '1 + subTotal + age', label: 'My Doubled Total', display: true }
    ],
    publishDate: new Date(),
    user: {
      username: 'dannycjones'
    },
    seeded: true
  }
];

async function seed () {
  const seedTasks = [];

  mongoose.connect(uri, options);

  try {
    seedTasks.push(
      User.insertMany(users)
        .then(records => {
          console.log(`${records.length} users created`);
        })
        .catch(console.error)
        .finally(() => mongoose.connection.close())
    );

    seedTasks.push(
      Calculator.insertMany(calculators)
        .then(records => {
          console.log(`${records.length} calculators created`);
        })
        .catch(console.error)
        .finally(() => mongoose.connection.close())
    );

    await Promise.all(seedTasks);
  } catch (e) {
    console.error(e);
  } finally {
    mongoose.connection.close();
  }
}

seed();
