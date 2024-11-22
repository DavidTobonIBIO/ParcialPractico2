import { Component, OnInit } from '@angular/core';
import { Anime } from '../anime';
import { AnimeService } from '../anime.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {

  selectedAnime!: Anime;
  selected = false;
  animes: Array<Anime> = [];
  avgRating: number = 0;
  totalEpisodes: number = 0;
  constructor(private animeService: AnimeService) { }

  getAnimes(): void {
    this.animeService.getAnimes().subscribe((animes: Anime[]) => {
      this.animes = animes;
      this.calculateAvgRating();
      this.calculateTotalEpisodes();
    });
  }

  onSelected(anime: Anime): void {
    this.selected = true;
    this.selectedAnime = anime;
  }

  ngOnInit() {
    this.getAnimes();
  }

  calculateAvgRating(): void {
    let sum: number = 0;
    for (let animes of this.animes) {
      sum += parseFloat(animes.Rating);
    }
    this.avgRating = parseFloat((sum / this.animes.length).toFixed(2));
  }

  calculateTotalEpisodes(): void {
    this.totalEpisodes = 0;
    for (let animes of this.animes) {
      this.totalEpisodes += animes.episode;
    }
  }

}
