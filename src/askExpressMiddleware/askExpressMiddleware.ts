import { NextFunction } from 'express';
import { runUntyped, Resources, Values } from '../askvm';
import { parse as parseCode } from '../askcode';
import { parse as parseScript } from '../askscript';
import { Request, Response } from 'express';

function parse(code: string, parser: Function) {
  try {
    return parser(code);
  } catch (e) {
    return false;
  }
}

export function askExpressMiddleware(
  environment: AskEnvironment,
  config: AskExpressMiddlewareConfig = {
    callNext: true,
    passError: false,
  }
) {
  return async function (
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const code = request.body.code;
      let parsedCode = parse(code, parseCode);
      if (!parsedCode) {
        parsedCode = parse(code, parseScript);
      }
      const queryResponse = await runUntyped(environment, parsedCode);
      response.json(queryResponse);
    } catch (err) {
      if (config.passError) {
        return next(err);
      }
    }

    if (config.callNext) {
      return next();
    }

    return;
  };
}

export interface AskExpressMiddlewareConfig {
  callNext?: boolean;
  passError?: boolean;
}

export interface AskEnvironment {
  resources?: Resources;
  values?: Values;
}
