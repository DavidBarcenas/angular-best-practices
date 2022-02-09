export interface GetTokenResponse {
  message: string;
  token: string;
  tokenExpiration: string;
}

export interface GetToken {
  email: string;
  password: string;
  language: string;
}

export class Auth {
  static getToken(email: string): GetToken {
    return {
      email,
      password: '',
      language: 'es-MX',
    };
  }
}
