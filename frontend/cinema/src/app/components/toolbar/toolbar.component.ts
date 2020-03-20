import { Component, OnInit, Inject } from '@angular/core';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { App } from 'src/app/models/app/app';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  app: App = new App();

  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private authService: AuthService
    ) { }

  ngOnInit() {
  }


  get appStore() {
    return this.storage.get('app');
  }

  logout() {
    let promise = new Promise((resolve, reject) => {

      this.authService.logout()
      .subscribe((response: any) => {

        resolve(response);

      } ,
      err => {
        reject(err);

        this.app.error = true; 
        this.app.email = null; 
        this.app.status = 'NOT AUTHORIZED';
        this.app.username = '*** NONE ***'; 
        this.app.role = null;
        
        this.storage.set("app", this.app);
      }
    );
  });
  
  return promise;
  }

}
