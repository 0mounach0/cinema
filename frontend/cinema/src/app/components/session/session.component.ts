import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Session } from 'src/app/models/session/session';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  session_id: any;
  session: Session = new Session();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.session_id = this.route.snapshot.paramMap.get("id");
    console.log(this.session_id);

    this.getSessionInfos();
  }

  //-------------------------
  counter(i: number) {
    return new Array(i);
  }


  /* ----------------------- */
  getSessionInfos() {

    let promise = new Promise((resolve, reject) => {
      this.sessionService.getOneSession(this.session_id)
     .subscribe((response: any) => {
       console.log(response);
       this.session = response.body;
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
