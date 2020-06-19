'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = __importDefault(require('express'));
var path_1 = __importDefault(require('path'));
var express_handlebars_1 = __importDefault(require('express-handlebars'));
var dotenv_1 = __importDefault(require('dotenv'));
var fs_1 = __importDefault(require('fs'));
if (fs_1.default.existsSync('.env')) {
  console.log('Using .env file to supply config environment variables');
  dotenv_1.default.config({ path: '.env' });
} else {
  console.log('Using .env.example file to supply config environment variables');
  dotenv_1.default.config({ path: '.env.example' }); // you can delete this after you create your own .env file!
}
var app = express_1.default();
app.use(
  express_1.default.static(path_1.default.join(__dirname, 'public'), {
    maxAge: 31557600000,
  })
);
// handlebars
app.engine(
  'handlebars',
  express_handlebars_1.default({
    layoutsDir: __dirname + '/views',
    defaultLayout: 'main',
  })
);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.get('/', function (req, res, next) {
  res.render('main', {
    title: 'AskScript Playground',
    askscriptServerUrl: process.env.ASKSCRIPT_SERVER_URL,
  });
});
/**
 * Start Express server.
 */
var server = app.listen(process.env.PORT, function () {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    process.env.PORT,
    process.env.NODE_ENV
  );
  console.log('  Press CTRL-C to stop\n');
});
exports.default = server;
