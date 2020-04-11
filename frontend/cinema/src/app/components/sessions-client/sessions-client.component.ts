import { Component, OnInit } from '@angular/core';
import { Cinema } from 'src/app/models/cinema/cinema';
import { Router, ActivatedRoute } from '@angular/router';
import { CinemaService } from 'src/app/services/cinema/cinema.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Session } from 'src/app/models/session/session';

@Component({
  selector: 'app-sessions-client',
  templateUrl: './sessions-client.component.html',
  styleUrls: ['./sessions-client.component.css']
})
export class SessionsClientComponent implements OnInit {

  /* ----------------------- */
  cinema_id: any;
  cinema: Cinema = new Cinema();
  date_picked: NgbDateStruct;
  sessions: Array<Session> = new Array();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cinemaService: CinemaService,
    private calendar: NgbCalendar
  ) { }

  ngOnInit() {

    this.cinema_id = this.route.snapshot.paramMap.get("id");
    console.log(this.cinema_id);

    this.getCinemaInfos();

    this.date_picked = this.calendar.getToday();
    this.datePicked();

  }

  /* ----------------------- */
  getCinemaInfos() {

    let promise = new Promise((resolve, reject) => {
      this.cinemaService.getOneCinema(this.cinema_id)
     .subscribe((response: any) => {
       console.log(response);
       this.cinema = response.body;
       resolve(response);
       } ,
     err => {
       console.log(  err.status );
       reject(err);
      });
    });

    return promise;
  }

  /* ----------------------- */
  getCinemaSessionsByDate(start_date, end_date) {

    let promise = new Promise((resolve, reject) => {
      this.cinemaService.getCinemaSessionByDate(this.cinema_id, start_date, end_date)
     .subscribe((response: any) => {
       console.log(response);
       this.sessions = response.body;
       resolve(response);
       } ,
     err => {
       console.log(  err.status );
       reject(err);
      });
    });

    return promise;
  }

  //-----------------

  formatDate_pick(dt){
    
    return `${
      dt.year.toString().padStart(4, '0')}-${
      dt.month.toString().padStart(2, '0')}-${
      dt.day.toString().padStart(2, '0')}`;
    
  }

  datePicked(){
    let start_date = this.formatDate_pick(this.date_picked) + " 00:00:00"; 
    let end_date = this.formatDate_pick(this.date_picked) + " 23:59:00";
    this.getCinemaSessionsByDate(start_date, end_date);
  }

  //---------------
  gotoSession(s_id) {
    this.router.navigate(['/session/'+s_id]);
  }



}
