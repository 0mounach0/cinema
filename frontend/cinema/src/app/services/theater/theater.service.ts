import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {

  /* -------- */
  private API_URL = environment.API_URL + "/cinema-service/";


  /* ----- */
  constructor(private httpClient: HttpClient) { }


  /* ------------- */
  createTheater(theater) {

    return this.httpClient.post(this.API_URL + "theater" ,
    JSON.stringify(theater) ,
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
  updateTheater(theater) {

    return this.httpClient.put(this.API_URL + "theater/" + theater.id ,
    JSON.stringify(theater) ,
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
  deleteTheater(id) {
    
    return this.httpClient.delete(this.API_URL + "theater/" + id,
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
