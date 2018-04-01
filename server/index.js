import express from 'express';
import { Nuxt, Builder } from 'nuxt';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

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

app.use(bodyParser.json());

// Import API Routes
app.use('/api', api);

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
