#!/usr/bin/env node

import express = require('express');
import bodyParser = require('body-parser');
import { parse } from './askcode';
import { resources, runUntyped } from './askvm';
import { askExpressMiddleware } from './askExpressMiddleware/askExpressMiddleware';

import chalk = require('chalk');
import { NextFunction, Request, Response } from 'express';

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

async function logRequestMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data: any = req.body;
  console.log(req.body);
  const { code } = data;

  console.log(chalk.grey(`➡️ ${code}`));
  const originalJson = res.json;
  res.json = function (obj) {
    res.locals.askResult = obj;
    res.json = originalJson;
    return res.json(obj);
  };
  return next();
}

const askMiddleware = askExpressMiddleware(
  { resources, values },
  { callNext: true, passError: true }
);

async function logResultsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req instanceof Error) {
    throw req;
  }
  console.log(chalk.grey(`⬅️ ${JSON.stringify(res.locals.askResult)}`));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/ask', [logRequestMiddleware, askMiddleware, logResultsMiddleware]);

const port = 80;
app.listen(port, () => {
  console.log(chalk.grey(`AskQL listening at http://localhost:${port}`));
});
