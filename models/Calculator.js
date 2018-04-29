var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ruleSchema = new Schema({
  input: {
    required: true,
    type: String
  },
  output: {
    required: true,
    type: {}
  },
  value: {
    required: true,
    type: String
  },
  comparator: {
    required: true,
    type: String
  }
});

const contentSchema = new Schema({
  rules: [ruleSchema],
  formula: String,
  dependencies: [String],
  type: String,
  display: String,
  options: {}
});

const blockSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  type: String,
  content: {},
  label: String,
  display: {
    type: Boolean,
    default: true
  }
});

const calculatorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  blocks: [blockSchema],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

const Calculator = mongoose.model('Calculator', calculatorSchema);

export default Calculator;
