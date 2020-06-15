import { NextFunction } from 'express';
import { runUntyped, Resources, Values } from '../askvm';
import { parse } from '../askcode';
import { Request, Response } from 'express';

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
      const askScriptCode = request.body.code;
      const queryResponse = await runUntyped(environment, parse(askScriptCode));
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
