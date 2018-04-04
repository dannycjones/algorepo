import { Router } from 'express';

import interpreter from '../interpreter';
import Calculator from '../../models/Calculator';

const router = Router();

router.get('/', (req, res, next) => {
  Calculator.find({}, (err, calculators) => {
    if (!err) {
      return res.send(calculators);
    }
    next(err);
  });
});

router.get('/:id', (req, res, next) => {
  Calculator.findById(req.params.id, (err, calculator) => {
    if (err) res.sendStatus(404);
    res.send(calculator);
  });
});

router.post('/:id/calculate', async (req, res, next) => {
  const { formData } = req.body;
  const calculator = await Calculator.findById(req.params.id).exec();
  const resultBlocks = calculator.blocks.filter(block => block.type === 'result');
  const results = {};

  for (const block of resultBlocks) {
    const blockResult = interpreter.process(block.content, formData);
    formData[block.id] = blockResult;
    if (block.display) {
      results[block.id] = blockResult;
    }
  }

  res.json({ results });
});

export default router;
