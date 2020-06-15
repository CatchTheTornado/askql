import { NextFunction } from 'express';
import { runUntyped, resources } from '../askvm';
import { parse } from '../askcode';
import { Request, Response } from 'express';

export function askExpressMiddleware(
  values: any,
  config: AskExpressMiddlewareConfig = {
    callNext: true,
    passError: false
  }
) {
  return async function (
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const askScriptCode = request.body.code;
      const queryResponse = await runUntyped(
        { values, resources },
        parse(askScriptCode)
      );
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
