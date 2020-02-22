import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  loginService(){

    let promise = new Promise((resolve, reject) => {

        this.authService.login(this.user)
        .subscribe((response: any) => {

          resolve(response);
          console.log("hopla");

        } ,
        err => {
          reject(err);
        }
      );
    });
    
    return promise;
  }

  onSubmit(): void {

     this.loginService().then((response: any) => {
      console.log(response);
    }).catch((err: any) => {
      console.log(err);
    }); 

  }

}
