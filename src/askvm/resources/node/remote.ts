import fetch from 'node-fetch';
import { isValue } from '../../../askcode';
import { asyncMap } from '../../../utils';
import { run, runUntyped } from '../../lib';
import { resource } from '../../lib/resource';
import { lambda, string, typed, Typed, untyped } from '../../lib/typed';

export const remote = resource<Typed<any>>({
  type: lambda(string, string),
  async compute(options, { params }) {
    const [urlParam, sourceParam] = params!;
    const url = (await runUntyped(options, urlParam)) as string;
    const source: string = String(
      isValue(sourceParam)
        ? await runUntyped(options, sourceParam)
        : sourceParam
    );

    const humanUrl = url === '/' ? 'http://localhost/ask' : url;
    const response = await fetch(humanUrl, {
      method: 'post',
      body: JSON.stringify({ code: source }),
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json();
    return typed(json);
  },
});
