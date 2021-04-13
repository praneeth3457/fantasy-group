import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | Observable<boolean | UrlTree> {
    return this.apiService.user.pipe(map(user => {
      const isAuth = !!user;
      if(!isAuth) {
        return this.router.createUrlTree(['/authenticate'])
      }
      return isAuth;
    }));
  }
}
