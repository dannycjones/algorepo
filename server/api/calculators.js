import { Router } from 'express';

import interpreter from '../interpreter';

const router = Router();

// Mock Calculators
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
    }
  },
  { id: 1, name: 'Calc 2' },
  { id: 2, name: 'Calc 3' }
];

router.get('/calculators', (req, res, next) => {
  res.json(calculators);
});

router.get('/calculators/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < calculators.length) {
    res.json(calculators[id]);
  } else {
    res.sendStatus(404);
  }
});

router.post('/calculators/:id/calculate', (req, res, next) => {
  const id = parseInt(req.params.id);
  const formData = req.body.formData;
  if (id >= 0 && id < calculators.length) {
    let resultBlocks = calculators[id].blocks.filter(block => block.type === 'result');
    let results = {};
    for (let block of resultBlocks) {
      let blockResult = interpreter.process(block.content, formData);
      formData[block.id] = blockResult;
      if (block.display) {
        results[block.id] = blockResult;
      }
    }
    res.json({ results });
  } else {
    res.sendStatus(404);
  }
});

export default router;
