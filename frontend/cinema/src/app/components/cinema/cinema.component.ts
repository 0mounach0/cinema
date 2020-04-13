import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CinemaService } from 'src/app/services/cinema/cinema.service';
import { Cinema } from 'src/app/models/cinema/cinema';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { App } from 'src/app/models/app/app';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  /* ----------------------- */
  cinema_id: any;
  cinema: Cinema = new Cinema();

  app: App = new App();

  constructor(
    private route: ActivatedRoute,
    private cinemaService: CinemaService,
    config: NgbModalConfig, 
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private authService: AuthService
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {

    

    this.getUser().then((data: any) => {
      
      this.cinema_id = this.route.snapshot.paramMap.get("id");
      //console.log(this.cinema_id);

      this.getCinemaInfos();

    }).catch(err => {
        this.app.error = true; 
        this.app.email = null; 
        this.app.status = 'NOT AUTHORIZED';
        this.app.username = '*** NONE ***'; 
        this.app.role = null;
        
        this.storage.set("app", this.app);
        this.router.navigate(['/home']);
    });

  }

  //------------
  getUser() {
    let promise = new Promise((resolve, reject) => {

        this.authService.getUser()
        .subscribe((response: any) => {

          resolve(response);

        } ,
        err => {
          reject(err);
        }
      );
    });
    
    return promise;
  }


  /* ----------------------- */
  getCinemaInfos() {

    let promise = new Promise((resolve, reject) => {
      this.cinemaService.getOneCinema(this.cinema_id)
     .subscribe((response: any) => {
       //console.log(response);
       this.cinema = response.body;
       resolve(response);
       } ,
     err => {
       //console.log(  err.status );
       reject(err);
      });
    });

    return promise;
  }


}
