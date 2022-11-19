import { MARVEL_API } from './env';

export const environment = {
  production: false,
  marvelAPI: {
    url: MARVEL_API.BASE_URL,
    publicKey: MARVEL_API.PUBLIC_KEY,
    privateKey: MARVEL_API.PRIVATE_KEY,
  },
};
