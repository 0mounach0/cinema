import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Theater } from 'src/app/models/theater/theater';
import { CinemaService } from 'src/app/services/cinema/cinema.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  /* ----------------------- */
  theaters: Array<Theater> = new Array();
  cinema_id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cinemaService: CinemaService
  ) { }

  ngOnInit() {

    this.cinema_id = this.route.snapshot.paramMap.get("id");
    console.log(this.cinema_id);

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

}
