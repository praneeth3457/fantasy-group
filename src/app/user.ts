export class User {
  constructor(
      public _username: string,
      public _userId: string,
      private _token?: string | null,
      private _tokenExpirationDate?: Date
  ){}

  get token() {
      if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
          return null;
      }
      return this._token;
  }

  get username() {
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
        return null;
    }
    return this._username;
  }

  get userId() {
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
        return null;
    }
    return this._userId;
  }
}
