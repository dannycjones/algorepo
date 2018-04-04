import { Router } from 'express';

import calculators from './calculators';
import users from './users';
import auth from './auth';

const router = Router();

router.use('/calculators', calculators);
router.use('/users', users);
router.use('/auth', auth);

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendStatus(500);
});

export default router;
