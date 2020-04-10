import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  /* -------- */
  private API_URL = environment.API_URL + "/cinema-service/";


  /* ----- */
  constructor(private httpClient: HttpClient) { }


  /* ------------- */
  createSession(session) {

    return this.httpClient.post(this.API_URL + "session" ,
    JSON.stringify(session) ,
      {
        headers:  new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json'),
        observe: 'response',
        withCredentials: true
      }
    );
    
  }

  /* ------------- */
  getOneSession(id) {
    
    return this.httpClient.get(this.API_URL + "session/" + id ,
      {
        headers:  new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json'),
        observe: 'response',
        withCredentials: true
      }
    );
    
  }

  /* ------------- */
  getSessionTickets(id) {
    
    return this.httpClient.get(this.API_URL + "session/" + id + "/tickets" ,
      {
        headers:  new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json'),
        observe: 'response',
        withCredentials: true
      }
    );
    
  }

  /* ------------- */
  updateSession(session) {

    return this.httpClient.put(this.API_URL + "session/" + session.id ,
    JSON.stringify(session) ,
      {
        headers:  new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json'),
        observe: 'response',
        withCredentials: true
      }
    );
    
  }

  /* ------------- */
  deleteSession(id) {
    
    return this.httpClient.delete(this.API_URL + "session/" + id,
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
