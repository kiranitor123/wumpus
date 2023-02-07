import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {

  constructor(public game: GameService, private router: Router) { }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['/']);
  }

}
