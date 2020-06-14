import { NextFunction } from 'express';
import { runUntyped, resources } from '../askvm';
import { parse } from '../askcode';
import { Request, Response } from 'express';

export function askExpressMiddleware(
  values: any,
  callNext = true,
  passError = false
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
      console.log('Here #@$');
      response.json(queryResponse);
    } catch (err) {
      if (passError) {
        return next(err);
      }
      console.error(err);
    }

    if (callNext) {
      return next();
    }

    return;
  };
}
