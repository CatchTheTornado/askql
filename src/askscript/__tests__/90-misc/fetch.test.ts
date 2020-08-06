jest.mock('node-fetch');
import fetch from 'node-fetch';
import { resources } from '../../../askvm';
import { e2e } from '../../../utils/tools';

describe('fetch.ask', () => {
  let result: any;

  beforeAll(async () => {
    fetch.mockReturnValue(mockedResponse());
    const environment = { resources };
    result = await e2e(
      "ask { fetch('https://jsonplaceholder.typicode.com/posts/1') }",
      environment
    );
  });

  it('should return expected data', () => {
    expect(result).toEqual({ id: 1 });
  });

  it('should call node fetch the correct number of times', () => {
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should call node fetch with the correct url', () => {
    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
  });
});

function mockedResponse() {
  return Promise.resolve({
    json: () => {
      return {
        id: 1,
      };
    },
  });
}
