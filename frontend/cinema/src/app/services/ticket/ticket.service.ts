import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  /* -------- */
  private API_URL = environment.API_URL + "/cinema-service/";


  /* ----- */
  constructor(private httpClient: HttpClient) { }

  /* ------------- */
  createTicket(ticket) {

    return this.httpClient.post(this.API_URL + "ticket" ,
    JSON.stringify(ticket) ,
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
