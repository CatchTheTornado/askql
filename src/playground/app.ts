import express from 'express';
import path from 'path';
import expressHandlebars from 'express-handlebars';

import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
  console.log('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  console.log('Using .env.example file to supply config environment variables');
  dotenv.config({ path: '.env.example' }); // you can delete this after you create your own .env file!
}

const app = express();

app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

// handlebars
app.engine(
  'handlebars',
  expressHandlebars({
    layoutsDir: __dirname + '/views',
    defaultLayout: 'main',
  })
);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.get('/', (req, res, next) => {
  res.render('main', {
    title: 'AskScript Playground',
    askscriptServerUrl: process.env.PLAYGROUND_ASK_SERVER_URL,
  });
});

/**
 * Start Express server.
 */
const server = app.listen(process.env.PLAYGROUND_PORT, () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    process.env.PLAYGROUND_PORT,
    process.env.NODE_ENV
  );
  console.log('  Press CTRL-C to stop\n');
});

export default server;
