import express from 'express';
import path from 'path';
import expressHandlebars from 'express-handlebars';

const app = express();

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 0 }));

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
    gtm: process.env.GTM, // Google Tag Manager code
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
