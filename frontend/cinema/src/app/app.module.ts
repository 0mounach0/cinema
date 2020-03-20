import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CinemasComponent } from './components/cinemas/cinemas.component';
import { MoviesComponent } from './components/movies/movies.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    CinemasComponent,
    MoviesComponent,
    SessionsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    StorageServiceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDl9Nq14tlbjMSBDk7vKiYB3_eGyxDn_KM',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
