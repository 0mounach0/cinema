import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

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
        observe: 'response',
        withCredentials: true
      }
    );
    
  }

  /* ------------- */
  getCinemaTheaters(id) {
    
    return this.httpClient.get(this.API_URL + "cinema/" + id + "/theaters",
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
  getCinemaSession(id) {
    
    return this.httpClient.get(this.API_URL + "cinema/" + id + "/sessions",
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
  getCinemaSessionByDate(id, start_date, end_date) {
    
    return this.httpClient.get(this.API_URL + "cinema/" + id + "/sessions?start_date="+start_date
                                            +"&end_date="+end_date,
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
  getOneCinema(id) {
    
    return this.httpClient.get(this.API_URL + "cinema/" + id ,
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
  deleteCinema(id) {
    
    return this.httpClient.delete(this.API_URL + "cinema/" + id,
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
  createCinema(cinema) {

    return this.httpClient.post(this.API_URL + "cinema" ,
    JSON.stringify(cinema) ,
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
  updateCinema(cinema) {

    return this.httpClient.put(this.API_URL + "cinema/" + cinema.id ,
    JSON.stringify(cinema) ,
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
