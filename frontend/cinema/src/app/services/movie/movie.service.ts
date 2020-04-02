import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  /* -------- */
  private API_URL = environment.API_URL_MOVIE + "/api/";


  /* ----- */
  constructor(private httpClient: HttpClient) { }


  /* ------------- */
  searchMovies(query) {
    
    return this.httpClient.get(this.API_URL + "movie/search/" + query,
      {
        headers:  new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json'),
        observe: 'response'
      }
    );
    
  }



}
