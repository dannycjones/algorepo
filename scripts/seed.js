import mongoose from 'mongoose';

import User from '../models/User';
import Calculator from '../models/Calculator';

const uri = process.env.MONGODB_URI || 'mongodb://localhost/main';
const options = {};

const calculators = [
  {
    name: 'Compound Interest Calculator',
    description: 'Calculate the final balance of a principal with compound interest',
    blocks: [
      { id: 'principal', type: 'input', content: { type: 'number', step: 0.01 }, default: 0, label: 'Principal Amount' },
      { id: 'intervalInterestRate', type: 'input', content: { type: 'number', step: 0.01 }, default: 0, label: 'Interval Interest Rate' },
      { id: 'periods', type: 'input', content: { type: 'number', step: 1 }, default: 0, label: 'Periods' },
      { id: 'finalBalance', type: 'result', content: { formula: 'principal * $power((1 + intervalInterestRate), periods)' }, label: 'Final Balance', display: true }
    ]
  }
];

async function seed () {
  mongoose.connect(uri, options);

  try {
    const adminUser = await User.register(new User({ name: 'Administrator', username: 'admin' }), 'change_me');
    console.log(`Inserted administrative user.`);

    calculators.forEach(calculator => {
      calculator.author = adminUser._id;
    });

    await Calculator.insertMany(calculators);

    console.log(`Inserted ${calculators.length} calculator${calculators.length > 1 ? 's' : ''}.`);
  } catch (e) {
    console.error(e);
  } finally {
    mongoose.connection.close();
  }
}

seed();
