import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.json({ user: { username: req.session.passport.user } });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.sendStatus(200);
});

export default router;
