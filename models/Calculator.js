var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  blocks: [],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

const Calculator = mongoose.model('Calculator', schema);

export default Calculator;
