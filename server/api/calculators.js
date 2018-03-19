import { Router } from 'express';

const router = Router();

// Mock Calculators
const calculators = [
  { name: 'Calc 1' },
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
