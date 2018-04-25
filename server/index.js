import 'babel-polyfill';
import express from 'express';
import { Nuxt, Builder } from 'nuxt';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import morgan from 'morgan';
import basicAuth from 'basic-auth';

import User from '../models/User';
import api from './api';

const isProduction = process.env.NODE_ENV === 'production';

const defaultHost = isProduction ? '0.0.0.0' : '127.0.0.1';

const app = express();
const host = process.env.HOST || defaultHost;
const port = process.env.PORT || 3000;

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

if (process.env.BASIC_AUTH_USER && process.env.BASIC_AUTH_PASSWORD) {
  function check (name, pass) {
    const validName = process.env.BASIC_AUTH_USER === name;
    const validPass = process.env.BASIC_AUTH_PASSWORD === pass;
  
    return validName && validPass;
  }

  console.log('Basic Auth enabled.');
  app.use((req, res, next) => {
    let credentials = basicAuth(req);
    // Check credentials
    // The "check" function will typically be against your user store
    if (!credentials || !check(credentials.name, credentials.pass)) {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="example"');
      res.end('Access denied');
    } else {
      next();
    }
  });
}

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
app.on('ready', function() { 
  app.listen(port, host);
  console.log('Server listening on ' + host + ':' + port);
}); 

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/main');
mongoose.connection.once('open', () => {
  console.log('Database connected.');
  if (!isProduction) {
    mongoose.set('debug', true);
  } 
  app.emit('ready'); 
});
