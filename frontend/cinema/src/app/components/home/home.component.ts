import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cinemas: Array<any> = new Array();

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getAllCinemas();
  }

  /* ----------------------- */
  getAllCinemas() {

    let promise = new Promise((resolve, reject) => {
      this.homeService.getAllCinemas()
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

}
