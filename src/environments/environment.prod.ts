export const environment = {
  production: true,
  apiUrl: '',
  apiVersion: '',
  get api(): string {
    return this.apiUrl + this.apiVersion;
  },
};
