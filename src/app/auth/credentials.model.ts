export class Credentials {
  id: number;
  username: string;
  token: string;
  roles: string[];

  get jwtToken() {
    return this.token.split(':')[0];
  }

}
