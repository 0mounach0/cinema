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
import { CinemaComponent } from './components/cinema/cinema.component';
import {MatTabsModule} from '@angular/material/tabs';
import { TheatersComponent } from './components/theaters/theaters.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { SessionComponent } from './components/session/session.component';
import { FooterComponent } from './components/footer/footer.component';
import { SessionsClientComponent } from './components/sessions-client/sessions-client.component';

export const MY_CUSTOM_FORMATS = {
  fullPickerInput: 'YYYY-MM-DD HH:mm:ss',
  parseInput: 'YYYY-MM-DD HH:mm:ss',
  datePickerInput: 'YYYY-MM-DD HH:mm:ss',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'
  };


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    CinemasComponent,
    MoviesComponent,
    SessionsComponent,
    LoginComponent,
    CinemaComponent,
    TheatersComponent,
    SessionComponent,
    FooterComponent,
    SessionsClientComponent
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
    MatTabsModule,
    MatExpansionModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers: [
    //{ provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    //{ provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
