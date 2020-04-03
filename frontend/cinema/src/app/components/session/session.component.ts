import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Session } from 'src/app/models/session/session';
import { SessionService } from 'src/app/services/session/session.service';
import { Ticket } from 'src/app/models/ticket/ticket';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QrcodeService } from 'src/app/services/qrcode/qrcode.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  session_id: any;
  session: Session = new Session();
  ticket: Ticket = new Ticket();
  tickets: Array<Ticket> = new Array();

  public imagePath;
  imgURL: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private ticketService: TicketService,
    private qrcodeService: QrcodeService,
    config: NgbModalConfig, 
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit() {
    this.session_id = this.route.snapshot.paramMap.get("id");
    console.log(this.session_id);

    this.getSessionInfos();
    this.getSessionTickets();
  }

  //-------------------------
  counter(i: number) {
    return new Array(i);
  }

  //-----------------------
  checkTickets(i){
    if(this.tickets.filter(ticket => ticket.seat_num == i).length == 1){
      return true;
    }
    else
      return false;
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

  /* ----------------------- */
  getSessionTickets() {

    let promise = new Promise((resolve, reject) => {
      this.sessionService.getSessionTickets(this.session_id)
     .subscribe((response: any) => {
       console.log(response);
       this.tickets = response.body;
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
  createTicket() {

    this.createTicketService().then((res: any) => {
      //this.modalService.dismissAll();
      this.showQrcode(res.body);
      this.getSessionTickets();
    });
    
  }
  

  /* ----------------------- */
  createTicketService() {
    let promise = new Promise((resolve, reject) => {
      this.ticketService.createTicket(this.ticket)
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

  //--------------------------------
  openCreateModal(content, i) {
    this.ticket.seat_num = i;
    this.ticket.session = this.session;
    this.modalService.open(content, { size: 'lg', scrollable: true });
  }

  /* ----------------------- */
  createQrcode(t) {
    let promise = new Promise((resolve, reject) => {
      this.qrcodeService.createQrcode(t)
     .subscribe((response: any) => {
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
  showQrcode(t) {

    this.createQrcode(t).then((res: any)=> {

  
      var reader = new FileReader();      
      reader.readAsDataURL(res.body); 
      reader.onload = (_event) => { 
        this.imgURL = reader.result; 
      }

    });

  }



}
