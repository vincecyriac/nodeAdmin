import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // if refresh access token is send or not
  isRefreshing = false;
  private refreshTokenSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private objLogin: AuthService
  ) { }

  intercept(
    objRequest: HttpRequest<any>,
    objNext: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if access token in the local storage append to same in incomming request
    if (this.objLogin.getAccessToken())
      objRequest = this.addToken(objRequest, this.objLogin.getAccessToken())
    return objNext.handle(objRequest).pipe(
      catchError((objError: any) => {
        if (objError instanceof HttpErrorResponse && (objError.status === 401))
          return this.handle401Error(objRequest, objNext)
        else
          return throwError(objError)
      })
    );
  }


  /**
   * Add token to all request
   * @param objRequest http request
   * @param access_token access token
   * @returns headers
   */
  private addToken(
    objRequest: HttpRequest<any>,
    access_token: string | null
  ): HttpRequest<any> {
    if (objRequest.url.includes('/admin/login') || objRequest.url.includes('admin/refreshToken')) {
      return objRequest.clone({
        setHeaders: {
          'Content-Type': `application/json; charset=utf-8`
        }
      })
    }
    return objRequest.clone({
      setHeaders: {
        'Content-Type': `application/json; charset=utf-8`,
        'Authorization': `token ${access_token}`,
      }
    })
  }

  //Handling 401 Error response
  private handle401Error(
    objRequest: HttpRequest<any>,
    objNext: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true
      //clearing the refresh token subject
      this.refreshTokenSubject$.next(null);
      // service to generate new access token by sending refresh token to server
      return this.objLogin.refreshLogin().pipe(
        switchMap((objToken: any) => {
          this.isRefreshing = false;
          this.objLogin.saveToken(objToken.accessToken, objToken.accessToken);
          this.refreshTokenSubject$.next(objToken.accessToken);
          return objNext.handle(
            this.addToken(objRequest, objToken.accessToken)
          );
        }),
        catchError((objError: any) => {
          this.isRefreshing = false;
          this.objLogin.logOut();
          return throwError(objError)
        })
      )
    }
    else {
      /**
       * if refreshing (getting new access token) is in progress then block the upcoming all other request
       * till a new valid acess token is emitting by refresh token subject
       */
      return this.refreshTokenSubject$.pipe(
        filter(strToken => strToken != null),
        take(1),
        switchMap(jwt => objNext.handle(this.addToken(objRequest, jwt))),
        finalize(() => {
          console.log("finished refresh token subject");

        })
      )
    }
  }

}


export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]
