export interface GetTokenResponse {
  message: string;
  token: string;
  tokenExpiration: string;
}

export class GetToken {
  constructor(
    public email: string,
    public password = '',
    public language = 'es-MX',
  ) {}
}

export class RefreshToken {
  constructor(public token: string | null, public language = 'es-MX') {}
}
