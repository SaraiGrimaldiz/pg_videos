import { Component } from '@angular/core';

import { MovieService, Movie } from '../services/movie.service'; // Ajusta el path según sea necesario


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  movies: Movie[] = [];
  newMovie: Movie = { title: '', description: '', genre: '', posterUrl: '', videoUrl: '' };
  posterFile: File | null = null;
  videoFile: File | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
  }

  handlePosterFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.posterFile = input.files.item(0);
    }
  }
  
  handleVideoFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.videoFile = input.files.item(0);
    }
  }
  

  addMovie() {
    alert('click');
    if (this.posterFile && this.videoFile) {
      this.movieService.addMovie(this.newMovie, this.posterFile, this.videoFile).then(() => {
        alert('Movie added successfully!');
        this.newMovie = { title: '', description: '', genre: '', posterUrl: '', videoUrl: '' };
        this.posterFile = null;
        this.videoFile = null;
      }).catch(error => {
        console.error('Error adding movie: ', error);
      });
    } else {
      alert('Please select a poster and a video file.');
    }
  }

  deleteMovie(id: string) {
    this.movieService.deleteMovie(id).then(() => {
      alert('Movie deleted successfully!');
    }).catch((error: any) => {
      console.error('Error deleting movie: ', error);
    });
  } 
}
