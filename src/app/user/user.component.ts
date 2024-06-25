import { Component, OnInit } from '@angular/core';
import { MovieService, Movie } from '../services/movie.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  genres: string[] = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
      this.filteredMovies = movies;
    });
  }

  filterMovies(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const genre = target.value;
    if (genre) {
      
      console.log(`Selected genre: ${genre}`);
      // Ejemplo: this.filteredMovies = this.movieService.getMoviesByGenre(genre);
    }


  }
}

