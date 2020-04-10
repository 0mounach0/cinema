import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CinemaService } from 'src/app/services/cinema/cinema.service';
import { Cinema } from 'src/app/models/cinema/cinema';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cinemas: Array<Cinema> = new Array();

  constructor(
    private cinemaService: CinemaService,
    private router: Router
  ) { }

  ngOnInit(){

    const cinemaMap = L.map('cinemaMap').setView([48.8534, 2.3488], 11);
 
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map'
    }).addTo(cinemaMap);

    this.getAllCinemas().then((res: any) => {
      this.initMarkers(cinemaMap);
    });

  }



  //----------
  initMarkers(cinemaMap) {

    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });

    this.cinemas.forEach(c => {  

      L.marker([+c.latitude, +c.longitude], {icon: myIcon})
       .bindPopup(
         '<a style="color: rgb(71, 71, 71);cursor: pointer;font-size: 2em;text-decoration: none;" href="'
         +location.origin+'/cinema/'+c.id+'" target="_blank">' +
          c.name.toString()
        +'<a></br>'+
        '<a style="cursor: pointer;" href="'
        +location.origin+'/cinema/'+c.id+'" target="_blank">'+
        '<img style="display: block;margin-left: auto;margin-right: auto;" src="../../../assets/cinema.png" width="150" alt="cinema">'
        +'</a>'
       )
       .addTo(cinemaMap)
       .openPopup();  
    });
    
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


  //-------------
  gotoCinema(){
    console.log('gooooooooo');
  }

}
