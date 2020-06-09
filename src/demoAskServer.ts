#!/usr/bin/env node

import express = require('express');
import bodyParser = require('body-parser');
import { askCodeToSource } from './askcode';
import { resources, runUntyped } from './askvm';
import { parse as parseAskScript } from './askscript';

import chalk = require('chalk');
import cors = require('cors');
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890abcdef', 8);

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

app.post('/compile/js', async (req, res) => {
  const { data } = req.body;
  const code = data;

  let askCode;
  let askCodeSource;

  const id = nanoid();

  try {
    console.log(id + ' -- ' + new Date().toString());
    console.log(id + ' -- ' + chalk.grey(`➡️ ${code}`));

    askCode = parseAskScript(code);

    askCodeSource = askCodeToSource(askCode);
  } catch (e) {
    console.error(id + ' -- ' + (new Date().toString()));
    console.error(id + ' -- ' + code);
    console.error(id + ' -- ' + e);
    console.error('\n\n');

    // res.status(400);

    // res.json({ error: e.toString() });
    res.json({ data: `document.write('<pre style="color:red; white-space: pre-wrap;">' + ${JSON.stringify(e.toString(), null, 2)} + '</pre>');`, language: 'js' });
    return;
  }

  try {
    const result = await runUntyped(baseEnvironment, askCode, []);

    console.log(id + ' -- ' + chalk.grey(`⬅️ ${JSON.stringify(result)}`));
    console.log('\n\n');
    res.json({ askCodeSource, data: `document.write('<pre style="color:blue; font-weight: bold; white-space: pre-wrap;">' + JSON.stringify(${JSON.stringify(result, null, 2)}, null, 2) + '</pre>');`, language: 'js' });
    // res.json({ askCodeSource, data: result, language: 'ask' });
  } catch (e) {
    console.error(id + ' -- ' + (new Date().toString()));
    console.error(id + ' -- ' + code);
    console.error(id + ' -- ' + e);
    console.error('\n\n');
    // res.json({ askCodeSource, error: e.toString() });
    // res.status(400);
    res.json({ askCodeSource, data: `document.write('<pre style="color:red; white-space: pre-wrap;">' + ${JSON.stringify(e.toString(), null, 2)} + '</pre>');`, language: 'js' });
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(chalk.grey(`AskQL listening at http://localhost:${port}`));
});
