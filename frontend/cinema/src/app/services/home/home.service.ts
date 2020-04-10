import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

 
  /* -------- */
  private API_URL = environment.API_URL + "/cinema-service/";


  /* ----- */
  constructor(private httpClient: HttpClient) { }


  /* ------------- */
  getAllCinemas() {
    
    return this.httpClient.get(this.API_URL + "cinema",
      {
        headers:  new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json'),
        observe: 'response'
      }
    );
    
  }
  
  
}
