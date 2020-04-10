import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Array<Movie> = new Array();
  query: String;
  selected: string;

  @Output() onMoviePicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  //-------------------
  pickMovie(movie) {
    this.selected = movie.id;
    this.onMoviePicked.emit(movie);
  }

  /* ----------------------- */
  searchMovies() {

    let promise = new Promise((resolve, reject) => {
      this.movieService.searchMovies(this.query)
     .subscribe((response: any) => {
       console.log(response);
       this.movies = response.body.results;
       resolve(response);
       } ,
     err => {
       console.log(  err.status );
       reject(err);
      });
    });

    return promise;
  }



}
