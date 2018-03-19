import { Router } from 'express';

import calculators from './calculators';

const router = Router();

router.use(calculators);

export default router;
