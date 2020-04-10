import { Component, OnInit } from '@angular/core';
import { Cinema } from 'src/app/models/cinema/cinema';
import { Session } from 'src/app/models/session/session';
import { Router, ActivatedRoute } from '@angular/router';
import { CinemaService } from 'src/app/services/cinema/cinema.service';
import { SessionService } from 'src/app/services/session/session.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TheaterService } from 'src/app/services/theater/theater.service';
import { Theater } from 'src/app/models/theater/theater';


@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  /* ----------------------- */
  sessions: Array<Session> = new Array();
  theaters: Array<Theater> = new Array();
  cinema_id: any;
  cinema: Cinema = new Cinema();
  session: Session = new Session();
  selectedTheater: string = "0";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cinemaService: CinemaService,
    private sessionService: SessionService,
    private theaterService: TheaterService,
    config: NgbModalConfig, 
    private modalService: NgbModal
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.cinema_id = this.route.snapshot.paramMap.get("id");
    console.log("hereee : " + this.cinema_id);

    this.getCinemaInfos();
    this.getCinemaTheaters();
    this.getCinemaSessions();
  }

  /* ----------------------- */
  getCinemaSessions() {

    let promise = new Promise((resolve, reject) => {
      this.cinemaService.getCinemaSession(this.cinema_id)
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

  /* ------------------ */
  getTheaterObjectById(id) {
    this.session.theater = this.theaters.filter(
      c => c.id == id
    )[0];
  }

  //--------------------------------
  openCreateModal(content) {
    this.modalService.open(content, { size: 'xl', scrollable: true });
  }


  /* ----------------------- */
  createSessionService() {
    let promise = new Promise((resolve, reject) => {
      this.sessionService.createSession(this.session)
     .subscribe((response: any) => {
       console.log(response);
       resolve(response);
       } ,
     err => {
       console.log(  err.status );
       reject(err);
      });
    });

    return promise;
  }

  formatDate(dt){
    
    return `${
      
      dt.getFullYear().toString().padStart(4, '0')}-${
      (dt.getMonth()+1).toString().padStart(2, '0')}-${
      dt.getDate().toString().padStart(2, '0')} ${
      dt.getHours().toString().padStart(2, '0')}:${
      dt.getMinutes().toString().padStart(2, '0')}:${
      dt.getSeconds().toString().padStart(2, '0')}`;
    
  }

  /* ----------------- */
  createSession() {

    this.getTheaterObjectById(this.selectedTheater);

    let d1 = new Date(this.session.startDate);
    this.session.startDate = this.formatDate(d1);

    let d2 = new Date(this.session.endDate);
    this.session.endDate = this.formatDate(d2);

    this.createSessionService().then((res: any) => {
      this.modalService.dismissAll();
      this.getCinemaSessions();
    });
    
  }

  /* open delete modal */
  openDeleteModal(content) {
    this.modalService.open(content, {centered: true});
  }


  /* ----------------------- */
  deleteSessionService(id) {
    let promise = new Promise((resolve, reject) => {
      this.sessionService.deleteSession(id)
     .subscribe((response: any) => {
       //console.log(response);
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
  deleteSession(id) {
    this.deleteSessionService(id).then((response: any) => {
      this.getCinemaSessions();
      this.modalService.dismissAll();
    });
  }


  //---------------------------------
  openUpdateModal(content, s) {
    this.modalService.open(content, { size: 'lg', scrollable: true });
    this.session = s;
  }

  /* ----------------------- */
  updateSessionService() {
    let promise = new Promise((resolve, reject) => {
      this.sessionService.updateSession(this.session)
     .subscribe((response: any) => {
       console.log(response);
       resolve(response);
       } ,
     err => {
       console.log(  err.status );
       reject(err);
      });
    });

    return promise;
  }


  /* ----------------- */
  updateSession() {

    this.updateSessionService().then((res: any) => {
      this.modalService.dismissAll();
      this.getCinemaSessions();
    });
    
  }

  /* ----------------------- */
  getCinemaTheaters() {

    let promise = new Promise((resolve, reject) => {
      this.cinemaService.getCinemaTheaters(this.cinema_id)
     .subscribe((response: any) => {
       console.log(response);
       this.theaters = response.body;
       resolve(response);
       } ,
     err => {
       console.log(  err.status );
       reject(err);
      });
    });

    return promise;
  }

  //---------------------
  pickMovie(movie) {
    this.session.movie_id = movie.id;
    this.session.original_title = movie.original_title;
    this.session.overview = movie.overview;
    this.session.poster_path = movie.poster_path;
    this.session.release_date = movie.release_date;
    this.session.status = movie.status;
    this.session.title = movie.title;
    this.session.vote_average = movie.vote_average.toString();
  }

}
