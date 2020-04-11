import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CinemasComponent } from './components/cinemas/cinemas.component';
import { MoviesComponent } from './components/movies/movies.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { LoginComponent } from './components/login/login.component';
import { CinemaComponent } from './components/cinema/cinema.component';
import { SessionComponent } from './components/session/session.component';
import { SessionsClientComponent } from './components/sessions-client/sessions-client.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cinemas', component: CinemasComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cinema/:id/settings', component: CinemaComponent },
  { path: 'cinema/:id/sessions', component: SessionsClientComponent },
  { path: 'session/:id', component: SessionComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
