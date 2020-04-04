import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Session } from 'src/app/models/session/session';
import { SessionService } from 'src/app/services/session/session.service';
import { Ticket } from 'src/app/models/ticket/ticket';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QrcodeService } from 'src/app/services/qrcode/qrcode.service';

/* ------ */
declare let paypal: any;

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

  addScript: boolean = false;
  paypalLoad: boolean = true;
  paypalActions: any;

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
    this.afterModalOpen();
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

  //-----------------paypal----------------------

  /* ------- */
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypal.com/sdk/js?client-id=ASK3BrtqFsn8khmF5CcJnSDEXdUbrlABe65RgmmkCvrsyuGBRWCIWGwSKz21aob4XgjxgJ0Z6eLlGZOy&currency=EUR';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

  /* --------- */
  afterModalOpen() {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        
        paypal.Buttons({
          onInit: (data, actions) => {
            
            actions.enable();

                this.paypalActions = actions;

          },
          onClick: (e) => {

            this.paypalActions.enable();

          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                  amount: { 
                    value: "8", // amount !!!!!
                    currency: 'EUR',
                    breakdown: {
                      item_total: {
                        currency_code: 'EUR',
                        value: "8" // amount !!!!!!
                      }
                    }
                  },
                  description: this.session.original_title,
                  items: [
                    {
                      name: this.session.start_date + " --> " + this.session.end_date,
                      quantity : 1,
                      unit_amount: {
                        currency_code : "EUR",
                        value: "8" // amount !!!!!
                      }
                    }
                  ]
              }]
            });
          },
          onApprove: (data, actions) => {

            return actions.order.capture().then((details) => {
              //Do something when payment is successful.
      
              //console.log(details);  details.id
              //---------------------
              
              this.createTicket();

            })
          },
          style: {
            layout: 'horizontal',
            size: 'responsive',
            color: 'blue',
            shape: 'rect',
            label: 'checkout',
            tagline: 'false'
           }
        }).render('#paypal-button-container');

        this.paypalLoad = false;
      })
    }
  }



}
