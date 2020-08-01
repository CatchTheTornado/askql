import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { toInt } from '../toInt';
import { resources } from '../../../../askvm';
import { e2e } from '../../../../utils/tools';

describe('math - toInt', () => {
  let input: any;
  let result: any;

  it(`should return 2 when given 2.3`, async () => {
    given(2.3);

    await execution();

    expect(result).toBe(2);
  });

  it(`should return 2 when given '2.3'`, async () => {
    given('2.3');

    await execution();

    expect(result).toBe(2);
  });

  it(`should return 3 when given 2.5`, async () => {
    given(2.5);

    await execution();

    expect(result).toBe(3);
  });

  it(`should return 3 when given '2.5'`, async () => {
    given('2.5');

    await execution();

    expect(result).toBe(3);
  });

  it(`should return -2 when given -2.5`, async () => {
    given(-2.5);

    await execution();

    expect(result).toBe(-2);
  });

  it(`should return -2 when given '-2.5'`, async () => {
    given('-2.5');

    await execution();

    expect(result).toBe(-2);
  });

  it(`should return -3 when given -2.51`, async () => {
    given(-2.51);

    await execution();

    expect(result).toBe(-3);
  });

  it(`should return -3 when given '-2.51'`, async () => {
    given('-2.51');

    await execution();

    expect(result).toBe(-3);
  });

  it(`should return 1 when given true`, async () => {
    given(true);

    await execution();

    expect(result).toBe(1);
  });

  it(`should return 0 when given false`, async () => {
    given(false);

    await execution();

    expect(result).toBe(0);
  });

  it(`should return 0 when given null`, async () => {
    given(null);

    await execution();

    expect(result).toBe(0);
  });

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

  function given(value: any) {
    input = value;
  }

  async function execution() {
    const environment = { resources };

    result = await e2e(`toInt(${input})`, environment);
  }

  function ask(code: string) {
    return runUntyped(
      {
        resources: { ...core, toInt },
      },
      parse(code)
    );
  }
});
