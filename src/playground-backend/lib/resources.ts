import { Resources, resource } from '../../askvm';

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
};
