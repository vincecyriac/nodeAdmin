import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private API_ENDPOINT = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getUserList(): Observable<any> {
      return this.http.get(this.API_ENDPOINT + 'user');
    }

  /* getUserList(): Observable<any> {
    let data = {
      firstName: "vince",
      lastName: "Cyriac",
      gender: "0",
      email: "vince15@gmail.com",
      password: "Vince@1234",
      number: "123456"
    }

    return this.http.post(this.API_ENDPOINT + 'user',data);
  } */
}
