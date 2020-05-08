#!/usr/bin/env node

import express = require('express');
import bodyParser = require('body-parser');
import { parse } from './askcode';
import { resources, runUntyped } from './askvm';

import chalk = require('chalk');

const values = {
  clientNames: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  hello: 'Hi! This is a AskVM server running on localhost',
  revPerClient: {
    A: 136,
    B: 426,
    C: 133,
    D: 35,
    E: 246,
    F: 446,
    G: 53,
  },
  test: 5,
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
