import { Router } from 'express';
import passport from 'passport';

import User from '../../models/User';

const router = Router();

router.post('/', (req, res, next) => {
  const { name, username, password } = req.body;
  User.register(new User({ name, username }), password, (err, User) => {
    if (err) {
      res.sendStatus(500);
    }
    passport.authenticate('local')(req, res, () => {
      res.sendStatus(200);
    });
  });
});

router.get('/', async (req, res, next) => {
  try {
    if (req.param('self') === '' || req.query.param) {
      let user = {};
      if (req.session.passport && req.session.passport.user) {
        user = await User.findOne({ username: req.session.passport.user });
      }
      res.json(user);
    } else {
      const users = await User.find({});
      res.json(users);
    }
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (e) {
    res.sendStatus(404);
  }
});

export default router;
