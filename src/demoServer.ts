#!/usr/bin/env node

import express = require('express');
import bodyParser = require('body-parser');
import { parse } from './askcode';
import { resources, runUntyped } from './askvm';

const values = {
  clientNames: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
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

app.post('/', (req, res) => {
  const data: any = req.body;
  const { code } = data;
  try {
    const result = runUntyped({ resources, values }, parse(code));
    res.json(result);
  } catch (e) {
    console.error(e);
    res.json(e);
  }
});

const port = 3000;
app.listen(port, () =>
  console.log(`AskQL listening at http://localhost:${port}`)
);
