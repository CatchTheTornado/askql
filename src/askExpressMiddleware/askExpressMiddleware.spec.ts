import {
  askExpressMiddleware,
  AskExpressMiddlewareConfig,
} from './askExpressMiddleware';
import { NextFunction } from 'express';
import { resources } from '../askvm';

describe(`askExpressMiddleware`, () => {
  const values = {
    hello: 'Hello world, this is AskQL 🦄',
  };

  const config: AskExpressMiddlewareConfig = {
    callNext: true,
    passError: false,
  };

  let middlware, mockRequest, mockResponse, mockNext;

  beforeEach(() => {
    middlware = askExpressMiddleware({ values, resources });
    mockNext = jest.fn() as jest.Mock<NextFunction>;
    mockRequest = ({
      body: {},
    } as unknown) as jest.Mock<Request>;
    mockResponse = ({
      json: jest.fn(),
    } as unknown) as jest.Mock<Response>;
  });

  it('should respond with the queried resource', async (done) => {
    // const askScript = `ask(query(node('hello',f(call(get('toUpperCase'),call(get('get'),'hello'))))))`;
    const askScript = `ask(f(call(get('toUpperCase'), call(get('get'),'hello'))))`;
    const expectedValue = values.hello.toUpperCase();

    mockRequest.body.code = askScript;

    await middlware(mockRequest, mockResponse, mockNext);
    expect(mockResponse.json).toHaveBeenCalledWith(expectedValue);
    done();
  });

  it('should run next without arguments', () => {
    middlware(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith();
  });

  it('should not run next if passed callNext false', () => {
    const errorProneMiddleware = askExpressMiddleware({}, { callNext: false });
    errorProneMiddleware(mockRequest, mockResponse, mockNext);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should run next with error when passed the error argument', () => {
    const errorProneMiddleware = askExpressMiddleware(
      {},
      { callNext: true, passError: true }
    );
    mockRequest.body = undefined; // should cause an error
    const expectedError = new TypeError(
      `Cannot read property 'code' of undefined`
    );
    errorProneMiddleware(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(expectedError);
  });
});
