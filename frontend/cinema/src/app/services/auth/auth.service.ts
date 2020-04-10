import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  private API_URL = environment.API_URL + '/';

  login (user) {
    const body = new HttpParams()
      .set('username', user.username)
      .set('password', user.password);

    return this.httpClient.post(this.API_URL + 'login',
      body.toString(),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
        observe: 'response',
        withCredentials: true
      }
    );
  }

  getUser() {
    return this.httpClient.get(this.API_URL + "user",
      {
        headers:  new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json'),
        observe: 'response',
        withCredentials: true
      }
    );
  }

  logout() {
    return this.httpClient.post(this.API_URL + "logout",
    null,
    {
      headers:  new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json'),
      observe: 'response',
      withCredentials: true
    }
    );
  }
  

}
