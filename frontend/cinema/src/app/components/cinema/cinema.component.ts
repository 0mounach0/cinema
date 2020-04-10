import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CinemaService } from 'src/app/services/cinema/cinema.service';
import { Cinema } from 'src/app/models/cinema/cinema';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  /* ----------------------- */
  cinema_id: any;
  cinema: Cinema = new Cinema();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cinemaService: CinemaService,
    config: NgbModalConfig, 
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {

    this.cinema_id = this.route.snapshot.paramMap.get("id");
    console.log(this.cinema_id);

    this.getCinemaInfos();

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


}
