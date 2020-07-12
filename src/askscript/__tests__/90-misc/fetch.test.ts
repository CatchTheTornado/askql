import program from './fetch.ask';

describe('fetch.ask', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should return expected data', async () => {
    fetch.mockResponse(Promise.resolve(response()));

    const result = await program();

    expect(result.id).toEqual(2);
  });

  it('should be called the correct number of times', async () => {
    fetch.mockResponse(Promise.resolve(response()));

    await program();

    expect(fetch.mock.calls.length).toEqual(1);
  });

  it('should call the correct url', async () => {
    fetch.mockResponse(Promise.resolve(response()));

    await program();

    expect(fetch.mock.calls[0][0]).toEqual(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
  });
});

function response() {
  return {
    json: () => {
      return {
        id: 2,
      };
    },
  };
}
