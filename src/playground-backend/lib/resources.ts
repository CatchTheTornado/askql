import { Resources, resource } from '../../askvm';
import fetch from 'node-fetch';

export const customResources: Resources = {
  withSmile: resource<string, [string]>({
    resolver: async (s: string): Promise<string> => {
      return ':) ' + s + ' :)';
    },
  }),

  hi: resource<string, []>({
    resolver: async (): Promise<string> => {
      return "Hi, this is AskQL server! It's " + new Date().toString();
    },
  }),
  statewise: resource({
    resolver: async () => {
      const res = await fetch('https://api.covid19india.org/data.json');
      const fullData = await res.json();
      const dataSet = fullData.statewise.splice(1);
      return dataSet.map(
        ({
          state,
          active,
          confirmed,
          deaths,
          recovered,
        }: {
          state: string;
          active: number;
          confirmed: number;
          deaths: number;
          recovered: number;
        }) => ({
          state,
          active,
          confirmed,
          deaths,
          recovered,
        })
      );
    },
  }),
};
