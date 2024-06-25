import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Ajusta la importación aquí
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Movie {
  id?: string;
  title: string;
  description: string;
  genre: string;
  posterUrl: string;
  videoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {}

  getMovies(): Observable<Movie[]> {
    return this.firestore.collection<Movie>('movies').valueChanges({ idField: 'id' });
  }


  getMovie(id: string): Observable<Movie> {
    return this.firestore.doc<Movie>(`movies/${id}`).valueChanges().pipe(
      map(movie => {
        if (!movie) {
          throw new Error('Movie not found');
        }
        return movie;
      })
    );
  }

  addMovie(movie: Movie, posterFile: File, videoFile: File): Promise<void> {
    const id = this.firestore.createId();
    const posterPath = `movies/${id}/poster.jpg`;
    const videoPath = `movies/${id}/video.mp4`;

    return this.storage.upload(posterPath, posterFile).then(() => {
      return this.storage.upload(videoPath, videoFile).then(() => {
        this.storage.ref(posterPath).getDownloadURL().subscribe(posterUrl => {
          this.storage.ref(videoPath).getDownloadURL().subscribe(videoUrl => {
            this.firestore.doc(`movies/${id}`).set({
              ...movie,
              posterUrl,
              videoUrl
            });
          });
        });
      });
    });
  }

  deleteMovie(id: string) {
    return this.firestore.doc(`movies/${id}`).delete();
  }
}
