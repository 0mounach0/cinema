import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CinemasComponent } from './components/cinemas/cinemas.component';
import { MoviesComponent } from './components/movies/movies.component';
import { SessionsComponent } from './components/sessions/sessions.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cinemas', component: CinemasComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'sessions', component: SessionsComponent }
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
