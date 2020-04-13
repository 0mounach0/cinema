import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user/user';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { App } from 'src/app/models/app/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  app: App = new App();
  error: boolean = false;

  constructor(
    private authService: AuthService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private router: Router) { }

  ngOnInit() {
  }

  loginService(){

    let promise = new Promise((resolve, reject) => {

        this.authService.login(this.user)
        .subscribe((response: any) => {

          resolve(response);

        } ,
        err => {
          this.error = true;
          reject(err);
        }
      );
    });
    
    return promise;
  }

  onSubmit(): void {

     this.loginService().then((response: any) => {

      if(response.body.status == "success") {

        this.getUser().then((data: any) => {

          this.app.username = data.body.username;
          this.app.email = data.body.email;
          this.app.role = data.body.role;
          this.app.status = data.body.status;

          this.storage.set("app", this.app);

          this.router.navigate(['/cinemas']);
        });

      }

    }).catch((err: any) => {
      //console.log(err);
    }); 

  }

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

}
