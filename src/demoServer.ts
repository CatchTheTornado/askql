#!/usr/bin/env node

import express = require('express');
import bodyParser = require('body-parser');
import { parse } from './askcode';
import { resources, runUntyped } from './askvm';

import chalk = require('chalk');

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

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/ask', async (req, res) => {
  const data: any = req.body;
  const { code } = data;
  try {
    console.log(chalk.grey(`➡️ ${code}`));
    const result = await runUntyped({ resources, values }, parse(code));
    console.log(chalk.grey(`⬅️ ${JSON.stringify(result)}`));
    res.json(result);
  } catch (e) {
    console.error(e);
    res.json({ error: e });
  }
});

const port = 80;
app.listen(port, () => {
  console.log(chalk.grey(`AskQL listening at http://localhost:${port}`));
});
