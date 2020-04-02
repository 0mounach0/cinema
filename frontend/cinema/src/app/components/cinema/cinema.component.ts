import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Theater } from 'src/app/models/theater/theater';
import { CinemaService } from 'src/app/services/cinema/cinema.service';
import { Cinema } from 'src/app/models/cinema/cinema';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TheaterService } from 'src/app/services/theater/theater.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  /* ----------------------- */
  theaters: Array<Theater> = new Array();
  cinema_id: any;
  cinema: Cinema = new Cinema();
  theater: Theater = new Theater();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cinemaService: CinemaService,
    private theaterService: TheaterService,
    config: NgbModalConfig, 
    private modalService: NgbModal
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {

    this.cinema_id = this.route.snapshot.paramMap.get("id");
    console.log(this.cinema_id);

    this.getCinemaInfos();
    this.getCinemaTheaters();

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

  //--------------------------------
  openCreateModal(content) {
    this.modalService.open(content, { size: 'lg', scrollable: true });
  }


  /* ----------------------- */
  createTheaterService() {
    let promise = new Promise((resolve, reject) => {
      this.theaterService.createTheater(this.theater)
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
  createTheater() {

    this.theater.cinema = this.cinema;
    
    this.createTheaterService().then((res: any) => {
      this.modalService.dismissAll();
      this.getCinemaTheaters();
    });
    
  }

  /* open delete modal */
  openDeleteModal(content) {
    this.modalService.open(content, {centered: true});
  }


  /* ----------------------- */
  deleteTheaterService(id) {
    let promise = new Promise((resolve, reject) => {
      this.theaterService.deleteTheater(id)
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
  deleteTheater(id) {
    this.deleteTheaterService(id).then((response: any) => {
      this.getCinemaTheaters();
      this.modalService.dismissAll();
    });
  }


  //---------------------------------
  openUpdateModal(content, t) {
    this.modalService.open(content, { size: 'lg', scrollable: true });
    this.theater = t;
  }

  /* ----------------------- */
  updateTheaterService() {
    let promise = new Promise((resolve, reject) => {
      this.theaterService.updateTheater(this.theater)
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
  updateTheater() {

    this.updateTheaterService().then((res: any) => {
      this.modalService.dismissAll();
      this.getCinemaTheaters();
    });
    
  }


}
