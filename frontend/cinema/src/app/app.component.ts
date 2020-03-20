import { Component, Inject } from '@angular/core';
import { App } from './models/app/app';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService
    ) { }
  
  app: App = new App();

  /* -------- */
  ngOnInit() {

    if (!this.storage.get('app')) {
      this.initSessionStorage();
    }

  }

  initSessionStorage(){

    this.app.status = 'NOT AUTHORIZED';
    this.app.username = '*** NONE ***';
    this.app.email = null;
    this.app.error = true;
    this.app.role = null;

    this.storage.set('app', this.app);

  }


}
