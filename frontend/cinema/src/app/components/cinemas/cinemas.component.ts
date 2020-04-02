import { Component, OnInit } from '@angular/core';
import { CinemaService } from 'src/app/services/cinema/cinema.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CityService } from 'src/app/services/city/city.service';
import { FormControl } from '@angular/forms';
import { Cinema } from 'src/app/models/cinema/cinema';
import { City } from 'src/app/models/city/city';

import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.css']
})
export class CinemasComponent implements OnInit {

  /* ----------------------- */
  cinemas: Array<Cinema> = new Array();
  cities: Array<City> = new Array();
  selectedCity: string = "0";
  cityExist: boolean = true;
  cinema: Cinema = new Cinema();
  newCity: City = new City();

  public appearance = Appearance;
  public selectedAddress: PlaceResult;


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
    this.modalService.open(content, {centered: true});
  }

  openCreateModal(content) {
    this.modalService.open(content, { size: 'lg', scrollable: true });
    this.getAllCities();
    this.cityExist = true;
  }

  openUpdateModal(content, c) {
    this.modalService.open(content, { size: 'lg', scrollable: true });
    this.getAllCities();
    this.cityExist = true;
    this.cinema = c;
    this.selectedCity = c.city.id;
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
    if(this.cityExist) {
      this.getCityObjectById(this.selectedCity);
      this.createCinemaService().then((res: any) => {
        this.modalService.dismissAll();
        this.getAllCinemas();
      });
    } else {
      this.createCityService().then((res: any) => {
        this.cinema.city = res.body;
        this.createCinemaService().then((res: any) => {
          this.modalService.dismissAll();
          this.getAllCinemas();
        });
      });
    }
    
  }

  /* ----------------- */
  updateCinema() {
    if(this.cityExist) {
      this.getCityObjectById(this.selectedCity);
      this.updateCinemaService().then((res: any) => {
        this.modalService.dismissAll();
        this.getAllCinemas();
      });
    } else {
      this.createCityService().then((res: any) => {
        this.cinema.city = res.body;
        this.updateCinemaService().then((res: any) => {
          this.modalService.dismissAll();
          this.getAllCinemas();
        });
      });
    }
    
  }

  /* ------------------ */
  getCityObjectById(id) {
    this.cinema.city = this.cities.filter(
      c => c.id == id
    )[0];
  }

  /* ----------------------- */
  createCinemaService() {
    let promise = new Promise((resolve, reject) => {
      this.cinemaService.createCinema(this.cinema)
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

  /* ----------------------- */
  updateCinemaService() {
    let promise = new Promise((resolve, reject) => {
      this.cinemaService.updateCinema(this.cinema)
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

  /* ----------------------- */
  createCityService() {
    let promise = new Promise((resolve, reject) => {
      this.cityService.createCity(this.newCity)
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



  //-----------------------

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    this.cinema.address = result.formatted_address;
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.cinema.latitude = location.latitude.toString();
    this.cinema.longitude = location.longitude.toString();
  }

}
