import 'babel-polyfill';
import express from 'express';
import { Nuxt, Builder } from 'nuxt';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import morgan from 'morgan';

import User from '../models/User';
import api from './api';

const isProduction = process.env.NODE_ENV === 'production';

const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/main');
  mongoose.set('debug', true);
}

app.set('port', port);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(require('express-session')({
  secret: process.env['SESSION_SECRET'] || 'please-change-me',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Import API Routes
app.use('/api', api);

// Passport config
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

// Init Nuxt.js
const nuxt = new Nuxt(config);

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

// Listen the server
app.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console
