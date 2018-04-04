import { Router } from 'express';

import calculators from './calculators';

const router = Router();

router.use('/calculators', calculators);

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendStatus(500);
});

export default router;
