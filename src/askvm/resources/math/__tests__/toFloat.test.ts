import { resources } from '../../../../askvm';
import { e2e } from '../../../../utils/tools';

describe('math - toFloat', () => {
  let result: any;

  const environment = { resources };

  it(`should return 2.3 when given 2.3`, async () => {
    result = await e2e(`toFloat(2.3)`, environment);

    expect(result).toBe(2.3);
  });

  it(`should return 2.3 when given '2.3'`, async () => {
    result = await e2e(`toFloat('2.3')`, environment);

    expect(result).toBe(2.3);
  });

  it(`should return -2.5 when given -2.5`, async () => {
    result = await e2e(`toFloat(-2.5)`, environment);

    expect(result).toBe(-2.5);
  });

  it(`should return -2.5 when given '-2.5'`, async () => {
    result = await e2e(`toFloat('-2.5')`, environment);

    expect(result).toBe(-2.5);
  });

  it(`should return 1 when given true`, async () => {
    result = await e2e(`toFloat(true)`, environment);

    expect(result).toBe(1);
  });

  it(`should return 0 when given false`, async () => {
    result = await e2e(`toFloat(false)`, environment);

    expect(result).toBe(0);
  });

  it(`should return 0 when given null`, async () => {
    result = await e2e(`toFloat(null)`, environment);

    expect(result).toBe(0);
  });

  it('should throw when given "4a"', async () => {
    await expect(e2e(`toFloat('4a')`, environment)).rejects.toEqual(
      new Error(`toFloat is unable to convert given value to Float.`)
    );
  });

  it('should throw when given "abc"', async () => {
    await expect(e2e(`toFloat('abc')`, environment)).rejects.toEqual(
      new Error(`toFloat is unable to convert given value to Float.`)
    );
  });

  it('should throw when given []', async () => {
    await expect(e2e(`toFloat([])`, environment)).rejects.toStrictEqual(
      new Error(`toFloat is unable to convert given value to Float.`)
    );
  });

  it('should throw when given [1]', async () => {
    await expect(e2e(`toFloat([1])`, environment)).rejects.toStrictEqual(
      new Error(`toFloat is unable to convert given value to Float.`)
    );
  });

  it('should throw when given [1,2]', async () => {
    await expect(e2e(`toFloat([1,2])`, environment)).rejects.toStrictEqual(
      new Error(`toFloat is unable to convert given value to Float.`)
    );
  });

  it('should throw when given {a:1}', async () => {
    await expect(
      e2e(`toFloat(object('a', 1))`, environment)
    ).rejects.toStrictEqual(
      new Error(`toFloat is unable to convert given value to Float.`)
    );
  });

  it('should throw when given {a:1, b:2}', async () => {
    await expect(
      e2e(`toFloat(object('a', 1, 'b', 2))`, environment)
    ).rejects.toStrictEqual(
      new Error(`toFloat is unable to convert given value to Float.`)
    );
  });
});
