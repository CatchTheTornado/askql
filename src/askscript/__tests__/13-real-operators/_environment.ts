import { Values, Resources, resource } from '../../../askvm';
export const values: Values = {
  bFromEnv: 4.3,
};

export const resources: Resources = {
  square: resource<number, [number]>({
    resolver: async (n: number): Promise<number> => {
      return n * n;
    },
  }),
};
