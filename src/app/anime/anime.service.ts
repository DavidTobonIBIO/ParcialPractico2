import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable, map } from 'rxjs';
import { Anime } from './anime';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }
  animes: Array<Anime> = [];

  getAnimes(): Observable<Anime[]> {
    return this.http.get<Anime[]>(this.apiUrl);
  }

  getAnime(id: string): Observable<Anime> {
    return this.http.get<Anime[]>(this.apiUrl).pipe(
      map((animes: Anime[]) => {
        for (let i = 0; i < animes.length; i++) {
          if (animes[i].id === parseInt(id)) {
            return animes[i];
          }
        }
        throw new Error(`Anime con ID ${id} no encontrado`);
      })
    );
  }
}