import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { askCodeToSource } from './askcode';
import {
  resources as builtInResources,
  runUntyped,
  resource,
  Resources,
} from './askvm';
import { parse as parseAskScript, AskScriptCode } from './askscript';

import chalk = require('chalk');
import { customAlphabet } from 'nanoid';

import packageInfo from './package.json';

const nanoid = customAlphabet('1234567890abcdef', 8);

const values = {
  clientNames: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  hello: 'Hi! This is a AskVM server running on localhost',
  revPerClient: {
    a: 426,
    b: 35,
    c: 446,
    d: 246,
    e: 133,
    f: 136,
    g: 53,
  },

  firstName: 'Luke',
  middleName: 'LukeLuke',
  lastName: 'Skywalker',
  fullName: 'Luke Skywalker',
  parents: [
    {
      firstName: 'Padmé',
      lastName: 'Amidala',
    },
    {
      firstName: 'Anakin',
      lastName: 'Skywalker',
    },
  ],
  friends: [
    {
      id: 0,
      firstName: 'Padmé',
      lastName: 'Amidala',
    },
    {
      id: 1,
      firstName: 'Anakin',
      lastName: 'Skywalker',
    },
  ],
};

export const customResources: Resources = {
  withSmile: resource<string, [string]>({
    resolver: async (s: string): Promise<string> => {
      return ':) ' + s + ' :)';
    },
  }),

  hi: resource<string, []>({
    resolver: async (): Promise<string> => {
      return "Hi, this is AskQL server! It's " + new Date().toString();
    },
  }),
};

const baseEnvironment = {
  resources: { ...builtInResources, ...customResources },
  values,
};

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.type('html');
  res.send(
    '<html><head><title>AskQL</title></head><body><p><b>Ask</b> me anything!</p><p><a href="http://askql.org/">AskQL website</a></p></body></html>'
  );
});

app.get('/version', async (req, res) => {
  res.json({ version: packageInfo.version });
});

app.post('/askscript', async (req, res) => {
  const code: AskScriptCode = req.body.code;

  if (typeof code !== 'string') {
    res.status(400).json({
      message: 'Please send Askscript code in "code" property',
    });
    return;
  }

  let askCode;
  let askCodeSource;

  const id = nanoid();

  try {
    console.log(id + ' -- ' + new Date().toString());
    console.log(id + ' -- ' + chalk.grey(`➡️ ${code}`));

    askCode = parseAskScript(code);

    askCodeSource = askCodeToSource(askCode);
  } catch (e) {
    console.error(id + ' -- ' + new Date().toString());
    console.error(id + ' -- ' + code);
    console.error(id + ' -- ' + e);
    console.error('\n\n');

    res.status(400).json({
      message: 'Could not compile your AskScript code',
      error: e.toString(),
    });
    return;
  }

  try {
    const result = await runUntyped(baseEnvironment, askCode, []);

    console.log(id + ' -- ' + chalk.grey(`⬅️ ${JSON.stringify(result)}`));
    console.log('\n\n');
    res.json({
      askCodeSource,
      message: 'Code run successfully',
      result,
    });
  } catch (e) {
    console.error(id + ' -- ' + new Date().toString());
    console.error(id + ' -- ' + code);
    console.error(id + ' -- ' + e);
    console.error('\n\n');

    res.status(400).json({
      message: 'Could not run your code',
      error: e.toString(),
    });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(chalk.grey(`AskQL listening at http://localhost:${port}`));
});
