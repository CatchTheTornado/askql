import { any, resource } from '../../lib';

export const delay = resource({
  type: any,
  async resolver(input:any){
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return input;
  },
});
