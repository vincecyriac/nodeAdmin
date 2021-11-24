import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private JWT_TOKEN = 'JWT_TOKEN';
  private RF_TOKEN = 'RF_TOKEN';
  private API_ENDPOINT = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  //check if user is logged in or not
  isLoggedIn() {
    if (localStorage.getItem(this.JWT_TOKEN)) {
      return true;
    }
    else {
      return false;
    }
  }

  //Login service
  public login(param: any): Observable<any> {
    return this.http.post(this.API_ENDPOINT + 'admin/login', param).pipe(map((user: any) => {
      let data: any = user;
      if (data) {
        localStorage.setItem(this.JWT_TOKEN, data.accessToken);
        localStorage.setItem(this.RF_TOKEN, data.refreshToken);
        this.router.navigateByUrl('/dashboard')
      }
    }));
  }

  //logout service
  logOut() {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    this.router.navigateByUrl('/login')
  }

  //get token from strorage (from auth interceptor)
  getAccessToken() {
    return localStorage.getItem(this.JWT_TOKEN)
  }

  //refresh currect access token (from auth interceptor)
  refreshLogin() {
    return this.http.post(this.API_ENDPOINT + 'admin/refreshToken', { refreshToken : localStorage.getItem(this.RF_TOKEN)} )
  }

  //save new access token (from auth interceptor)
  saveToken(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.JWT_TOKEN, accessToken)
    localStorage.setItem(this.RF_TOKEN, refreshToken)
    return true
  }

}
