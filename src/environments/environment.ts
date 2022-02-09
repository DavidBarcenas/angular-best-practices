import {env} from './.env';

export const environment = {
  production: false,
  apiUrl: env.apiUrl,
  apiVersion: env.apiVersion,
  getToken: env.endpoints.getToken,
  refreshToken: env.endpoints.refreshToken,
  get api(): string {
    return this.apiUrl + this.apiVersion;
  },
};
