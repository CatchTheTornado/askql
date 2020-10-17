import { NextFunction } from 'express';
import { runUntyped, Resources, Values } from '../askvm';
import { parse } from '../askscript';
import { Request, Response } from 'express';

function getParsedCode(requestBody: { [key: string]: string }) {
  const code = requestBody.code;

  if (typeof code !== 'string')
    throw new Error('Missing code in request body!');

  let parsedCode = parse(code);

  return parsedCode;
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
      const parsedCode = getParsedCode(request.body);
      const queryResponse = await runUntyped(environment, parsedCode);
      response.json(queryResponse);

      if (config.callNext) {
        return next();
      }
    } catch (err) {
      config.passError && next(err);
      return;
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
