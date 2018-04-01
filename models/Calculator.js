var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// let example = {
//   id: 0,
//   name: 'Calc 1',
//   blocks: [
//     { id: 'age', type: 'input', content: { type: 'text', min: 0, max: 200 }, value: 0, label: 'Age' },
//     { id: 'weight', type: 'input', content: { type: 'options', display: 'select', options: [{text: '0-10', value: 10}, {text: '11-20', value: 20}] }, label: 'Weight' },
//     { id: 'anotherThing', type: 'input', content: { type: 'options', display: 'buttons', options: [1, 2, 3].map(num => { return { text: 'Option ' + num, value: num }; }) }, label: 'My Set Of Buttons' },
//     { id: 'subTotal', type: 'result', content: '1 + 2', label: 'My Subtotal', display: false },
//     { id: 'endResult', type: 'result', content: '1 + subTotal + age', label: 'My Doubled Total', display: true }
//   ],
//   publishDate: new Date(),
//   user: {
//     username: 'dannycjones'
//   }
// };

const schema = new Schema({
  name: String,
  blocks: [],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  seeded: { type: Boolean, default: false }
}, {
  timestamps: true
});

const Calculator = mongoose.model('Calculator', schema);

export default Calculator;
