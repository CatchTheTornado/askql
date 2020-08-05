import { resources } from '../../../../askvm';
import { e2e } from '../../../../utils/tools';

describe('math - toInt', () => {
  let result: any;

  const environment = { resources };

  it(`should return 2 when given 2.3`, async () => {
    result = await e2e(`toInt(2.3)`, environment);

    expect(result).toBe(2);
  });

  it(`should return 2 when given '2.3'`, async () => {
    result = await e2e(`toInt('2.3')`, environment);

    expect(result).toBe(2);
  });

  it(`should return 3 when given 2.5`, async () => {
    result = await e2e(`toInt(2.5)`, environment);

    expect(result).toBe(3);
  });

  it(`should return 3 when given '2.5'`, async () => {
    result = await e2e(`toInt('2.5')`, environment);

    expect(result).toBe(3);
  });

  it(`should return -2 when given -2.5`, async () => {
    result = await e2e(`toInt(-2.5)`, environment);

    expect(result).toBe(-2);
  });

  it(`should return -2 when given '-2.5'`, async () => {
    result = await e2e(`toInt('-2.5')`, environment);

    expect(result).toBe(-2);
  });

  it(`should return -3 when given -2.51`, async () => {
    result = await e2e(`toInt(-2.51)`, environment);

    expect(result).toBe(-3);
  });

  it(`should return -3 when given '-2.51'`, async () => {
    result = await e2e(`toInt('-2.51')`, environment);

    expect(result).toBe(-3);
  });

  it(`should return 1 when given true`, async () => {
    result = await e2e(`toInt(true)`, environment);

    expect(result).toBe(1);
  });

  it(`should return 0 when given false`, async () => {
    result = await e2e(`toInt(false)`, environment);

    expect(result).toBe(0);
  });

  it(`should return 0 when given null`, async () => {
    result = await e2e(`toInt(null)`, environment);

    expect(result).toBe(0);
  });

  it('should throw when given "4a"', async () => {
    await expect(e2e(`toInt('4a')`, environment)).rejects.toEqual(
      new Error(`toInt is unable to convert given value to Integer.`)
    );
  });

  it('should throw when given "abc"', async () => {
    await expect(e2e(`toInt('abc')`, environment)).rejects.toEqual(
      new Error(`toInt is unable to convert given value to Integer.`)
    );
  });

  it('should throw when given []', async () => {
    await expect(e2e(`toInt([])`, environment)).rejects.toStrictEqual(
      new Error(`toInt is unable to convert given value to Integer.`)
    );
  });

  it('should throw when given [1]', async () => {
    await expect(e2e(`toInt([1])`, environment)).rejects.toStrictEqual(
      new Error(`toInt is unable to convert given value to Integer.`)
    );
  });

  it('should throw when given [1,2]', async () => {
    await expect(e2e(`toInt([1,2])`, environment)).rejects.toStrictEqual(
      new Error(`toInt is unable to convert given value to Integer.`)
    );
  });

  it('should throw when given {a:1}', async () => {
    await expect(
      e2e(`toInt(object('a', 1))`, environment)
    ).rejects.toStrictEqual(
      new Error(`toInt is unable to convert given value to Integer.`)
    );
  });

  it('should throw when given {a:1, b:2}', async () => {
    await expect(
      e2e(`toInt(object('a', 1, 'b', 2))`, environment)
    ).rejects.toStrictEqual(
      new Error(`toInt is unable to convert given value to Integer.`)
    );
  });
});
