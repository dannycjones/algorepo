import { Router } from 'express';
import { cloneDeep } from 'lodash';

import interpreter from '../interpreter';
import Calculator from '../../models/Calculator';
import User from '../../models/User';

const router = Router();

function compare(comparator, input, value) {
  const inputStr = input.toString();
  switch (comparator) {
    case "LESS_THAN":
      return inputStr < value;
    case "GREATER_THAN":
      return inputStr > value;
    case "LESS_THAN_OR_EQUAL":
      return inputStr <= value;
    case "GREATER_THAN_OR_EQUAL":
      return inputStr >= value;
    case "EQUAL":
      return inputStr === value;
    throw new Error('Unexpected comparator encountered: ' + comparator);
  }
  return false;
}

function getRuleReducer(data) {
  return function ruleReducer(acc, rule) {
    if (acc == null) {
      const input = data[rule.input];
      const { comparator, value, output } = rule;
      if (compare(comparator, input, value)) {
        if (Array.isArray(output)) {
          return output.reduce(ruleReducer, null);
        }
        return output;
      } else {
        return null;
      }
    }
    return acc;
  };
}

router.get('/', (req, res, next) => {
  Calculator.find({}, (err, calculators) => {
    if (!err) {
      return res.send(calculators);
    }
    next(err);
  });
});

router.get('/:id', async (req, res, next) => {
  let calculator;
  try {
    calculator = await Calculator.findById(req.params.id);
  } catch (e) {
    return res.sendStatus(404);
  }
  const author = await User.findById(calculator.author);
  calculator.author = author;
  res.send(calculator);
});

router.put('/:id', async (req, res, next) => {
  const { calculator } = req.body;
  if (calculator == null) {
    next('No calculator sent');
  }
  delete calculator._id;
  
  await Calculator.findByIdAndUpdate(req.params.id, { $set: calculator }).then(console.log).catch(console.error);
  res.sendStatus(200);
});

router.post('/:id/calculate', async (req, res, next) => {
  try {
    const { formData, token = null } = req.body;
    const calculator = await Calculator.findById(req.params.id);
    const resultAndComparatorBlocks = calculator.blocks.filter(block => ['formula', 'conditional'].includes(block.type));
    const data = cloneDeep(formData);
    const values = {};

    for (const block of resultAndComparatorBlocks) {
      if (block.type === 'formula') {
        data[block.id] = interpreter.process(block.content, data);
      } else if (block.type === 'conditional') {
        data[block.id] = block.content.rules.reduce(getRuleReducer(data), undefined);
      }
      if (block.display) {
        values[block.id] = data[block.id];
      }
    }

    res.json({ values, token });
  } catch (e) {
    next(e);
  }
});

export default router;
