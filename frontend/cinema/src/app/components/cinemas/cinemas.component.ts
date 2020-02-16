import { Component, OnInit } from '@angular/core';
import { CinemaService } from 'src/app/services/cinema/cinema.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CityService } from 'src/app/services/city/city.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.css']
})
export class CinemasComponent implements OnInit {

  /* ----------------------- */
  cinemas: Array<any> = new Array();
  cities: Array<any> = new Array();
  source = new FormControl();
  selectedCity: string;


  /* ----------------------- */
  constructor(private cinemaService: CinemaService,
              private cityService: CityService,
              config: NgbModalConfig, 
              private modalService: NgbModal) { 
        config.backdrop = 'static';
        config.keyboard = false;
    }

  /* ----------------------- */
  ngOnInit(): void {
    this.getAllCinemas();
    this.getAllCities();
  }

  /* ----------------------- */
  getAllCinemas() {

    let promise = new Promise((resolve, reject) => {
      this.cinemaService.getAllCinemas()
     .subscribe((response: any) => {
       console.log(response);
       this.cinemas = response.body;
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
  getAllCities() {

    let promise = new Promise((resolve, reject) => {
      this.cityService.getAllCities()
     .subscribe((response: any) => {
       console.log(response);
       this.cities = response.body;
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
  deleteCinema(id) {
    this.deleteCinemaService(id).then((response: any) => {
      this.getAllCinemas();
      this.modalService.dismissAll();
    });
  }

  /* open delete modal */
  openDeleteModal(content) {
    this.modalService.open(content);
  }

  openCreateModal(content) {
    this.modalService.open(content, { size: 'lg', scrollable: true });
    this.getAllCities();
  }

  /* ----------------------- */
  deleteCinemaService(id) {
    let promise = new Promise((resolve, reject) => {
      this.cinemaService.deleteCinema(id)
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


  /* ----------------- */
  createCinema() {
    console.log(this.selectedCity);
  }

}
