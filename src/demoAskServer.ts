#!/usr/bin/env node

import express = require('express');
import bodyParser = require('body-parser');
import { askCodeToSource } from './askcode';
import { resources, runUntyped } from './askvm';
import { parse as parseAskScript } from './askscript';

import chalk = require('chalk');
import cors = require('cors');

const values = {
  clientNames: ['a', 'b', 'c', 'd', 'r', 'f', 'g'],
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
  test: 15,
};

const baseEnvironment = {
  resources,
  values,
};

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.type('html');
  res.send('<html><head><title>AskQL</title></head><body><p><b>Ask</b> me anything!</p><p><a href="http://askql.org/">AskQL website</a></p></body></html>');
});

app.post('/ask', async (req, res) => {
  const data: any = req.body;
  const { code } = data;

  let askCode;
  let askCodeSource;

  try {
    console.log(chalk.grey(`➡️ ${code}`));

    askCode = parseAskScript(code);

    askCodeSource = askCodeToSource(askCode);
  } catch (e) {
    console.error(new Date().toString());
    console.error(code);
    console.error(e);
    console.error('\n\n');
    res.json({ error: e.toString() });
    return;
  }

  try {
    const result = await runUntyped(baseEnvironment, askCode, []);

    console.log(chalk.grey(`⬅️ ${JSON.stringify(result)}`));
    res.json({ askCodeSource, result });
  } catch (e) {
    console.error(new Date().toString());
    console.error(code);
    console.error(e);
    console.error('\n\n');
    res.json({ askCodeSource, error: e.toString() });
  }
});

const port = 80;
app.listen(port, () => {
  console.log(chalk.grey(`AskQL listening at http://localhost:${port}`));
});
