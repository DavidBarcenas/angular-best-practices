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
