import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { toInt } from '../toInt';

describe('math - toInt', () => {
  let result: any;

  it(`should return 2 when given 2.3`, async () => {
    result = await ask(`toInt(2.3)`);

    expect(result).toBe(2);
  });

  it(`should return 2 when given '2.3'`, async () => {
    result = await ask(`toInt('2.3')`);

    expect(result).toBe(2);
  });

  it(`should return 3 when given 2.5`, async () => {
    result = await ask(`toInt(2.5)`);

    expect(result).toBe(3);
  });

  it(`should return 3 when given '2.5'`, async () => {
    result = await ask(`toInt('2.5')`);

    expect(result).toBe(3);
  });

  it(`should return -2 when given -2.5`, async () => {
    result = await ask(`toInt(-2.5)`);

    expect(result).toBe(-2);
  });

  it(`should return -2 when given '-2.5'`, async () => {
    result = await ask(`toInt('-2.5')`);

    expect(result).toBe(-2);
  });

  it(`should return -3 when given -2.51`, async () => {
    result = await ask(`toInt(-2.51)`);

    expect(result).toBe(-3);
  });

  it(`should return -3 when given '-2.51'`, async () => {
    result = await ask(`toInt('-2.51')`);

    expect(result).toBe(-3);
  });

  /*
  it(`should return 1 when given true`, async () => {
    result = await ask(`toInt(true)`);

    expect(result).toBe(1);
  });

  it(`should return 0 when given false`, async () => {
    result = await ask(`toInt(false)`);

    expect(result).toBe(0);
  });

  it(`should return 0 when given null`, async () => {
    result = await ask(`toInt(null)`);

    expect(result).toBe(0);
  });
   */

  it('should throw when given non-number string', async () => {
    await expect(ask(`toInt('4a')`)).rejects.toStrictEqual(
      new Error(`toInt is unable to convert given value to Integer.`)
    );
  });

  it('should throw when given array', async () => {
    await expect(ask(`toInt([])`)).rejects.toStrictEqual(
      new Error(`toInt is unable to convert given value to Integer.`)
    );
  });

  it('should throw when given object', async () => {
    await expect(ask(`toInt(object('a', 1))`)).rejects.toStrictEqual(
      new Error(`toInt is unable to convert given value to Integer.`)
    );
  });

  function ask(code: string) {
    return runUntyped(
      {
        resources: { ...core, toInt },
      },
      parse(code)
    );
  }
});
