import { runUntyped } from '../askvm';
import { askExpressMiddleware } from './askExpressMiddleware';
import { NextFunction } from 'express';

jest.mock('../askvm', () => {
    return {
        ...(jest.requireActual('../askvm')),
        runUntyped: jest.fn()
    };
});

const values = {
    hello: 'Hello World!'
};

describe(`askExpressMiddleware`, () => {
    let middlware, mockRequest, mockResponse, mockNext;

    beforeEach(() => {
        middlware = askExpressMiddleware(values);
        mockNext = jest.fn() as jest.Mock<NextFunction>;
        mockRequest = {} as jest.Mock<Request>;
        mockResponse = {
            json: jest.fn()
        } as unknown as jest.Mock<Response>;
    });

    describe('the middleware', () => {
        it('should respond with the queried resource', async (done) => {
            const askScript = 'hello';
            mockRequest.body = {
                code: askScript
            };
            await middlware(mockRequest, mockResponse, mockNext);
            expect(mockResponse.json).toHaveBeenCalledWith(values.hello);
            done();
        });

        it('should run next without arguments', () => {
            middlware(mockRequest, mockResponse, mockNext);

            expect(mockNext).toHaveBeenCalledWith();
        });

        it('should not run next if passed callNext false', () => {
            const errorProneMiddleware = askExpressMiddleware({}, false);
            errorProneMiddleware(mockRequest, mockResponse, mockNext);
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should run next with error when passed the error argument', () => {
            // TODO::mock the logic and return an error
            const errorProneMiddleware = askExpressMiddleware({}, true, true);
            const expectedError = new TypeError(`Cannot read property 'code' of undefined`);
            errorProneMiddleware(mockRequest, mockResponse, mockNext);
            expect(mockNext).toHaveBeenCalledWith(expectedError);
        });

    });
});