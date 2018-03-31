import { Router } from 'express';

const router = Router();

// Mock Calculators
const calculators = [
  {
    name: 'Calc 1',
    blocks: [
      { id: 'age', type: 'input', content: { type: 'text', min: 0, max: 200 }, value: 0, label: 'Age' },
      { id: 'weight', type: 'input', content: { type: 'options', display: 'select', options: [{text: '0-10', value: 10}, {text: '11-20', value: 20}] }, label: 'Weight' },
      { id: 'anotherThing', type: 'input', content: { type: 'options', display: 'buttons', options: [1, 2, 3].map(num => { return { text: 'Option ' + num, value: num }; }) }, label: 'My Set Of Buttons' },
      { id: 'subTotal', type: 'result', content: 'some pegjs expression', label: 'My Subtotal', display: false },
      { id: 'endResult', type: 'result', content: 'some pegjs expression', label: 'My Doubled Total', display: true }
    ],
    publishDate: new Date(),
    user: {
      username: 'dannycjones'
    }
  },
  { name: 'Calc 2' },
  { name: 'Calc 3' }
];

router.get('/calculators', function (req, res, next) {
  res.json(calculators);
});

router.get('/calculators/:id', function (req, res, next) {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < calculators.length) {
    res.json(calculators[id]);
  } else {
    res.sendStatus(404);
  }
});

export default router;
