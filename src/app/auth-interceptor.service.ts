import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http'
import { ApiService } from './api.service';
import { take, exhaustMap } from 'rxjs/operators'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private apiService: ApiService){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    return this.apiService.user.pipe(
      take(1),
      exhaustMap((user:any) =>{
        if(user) {
          const modifiedReq = req.clone({headers: new HttpHeaders({"token": user.token, "username": user.username})});
          return next.handle(modifiedReq)
        }

        return next.handle(req)
      })
    );
  }
}
