import { isValue } from '../../../askcode';
import { any, resource, runUntyped } from '../../lib';

const fetch = (global as any).fetch;

export const remote = resource({
  type: any,
  async compute(options, { params }) {
    const [urlParam, sourceParam] = params!;
    const url = (await runUntyped(options, urlParam)) as string;
    const code: string = String(
      isValue(sourceParam)
        ? await runUntyped(options, sourceParam)
        : sourceParam
    );

    const humanUrl = url === '/' ? 'http://localhost/ask' : url;
    const response = await fetch(humanUrl, {
      method: 'post',
      body: JSON.stringify({ code }),
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json();
    return json;
  },
});
