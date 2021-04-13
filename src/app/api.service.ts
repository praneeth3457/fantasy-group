import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user = new BehaviorSubject<User | null>(null);
  API_ENDPOINT = "https://thawing-anchorage-47958.herokuapp.com/"

  constructor(private http: HttpClient) { }

  register(reqObj) {
    return this.http.post(
      this.API_ENDPOINT + 'register',
      reqObj
    );
  }

  login(reqObj) {
    return this.http.post(
      this.API_ENDPOINT + 'login',
      reqObj
    ).pipe(
      catchError((error, caught) => {
        return Observable.throw(error);
      }),
      tap((resData: any) => {
        const userResData: any = {
          username: reqObj.username,
          token: resData.token,
          tokenExpirationDate: new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000),
          userId: resData.userId
        }
        this.handleAuthentication(userResData);
      })
    );
  }

  private handleAuthentication(userData: any) {
    const currentUser = new User(userData.username, userData.userId, userData.token, userData.tokenExpirationDate);
    this.user.next(currentUser);
    localStorage.setItem('userData', JSON.stringify(currentUser));
  }

  removeUser() {
    localStorage.removeItem('userData');
  }

  autoLogin() {
    const userData: any = localStorage.getItem('userData');
    if(!userData) {
      return;
    }
    const parsedData = JSON.parse(userData);

    const loadedUser = new User(parsedData._username, parsedData._userId, parsedData._token, new Date(parsedData._tokenExpirationDate));
    if(loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  getMatches() {
    return this.http.get(this.API_ENDPOINT + "getMatches");
  }

  completedMatches() {
    return this.http.get(this.API_ENDPOINT + "completedMatches");
  }

  getPoints() {
    return this.http.get(this.API_ENDPOINT + "getPoints");
  }

  setUserMatch(userObj) {
    return this.http.post(
      this.API_ENDPOINT + "setUserMatch",
      userObj
    );
  }
}

