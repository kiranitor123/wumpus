import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Perception } from '../model/perceptions';
import { Room } from '../model/room';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor(public game: GameService, private route: Router) {}

  ngOnInit(): void {
    if(!this.game.gameInProgress()) {
      this.route.navigate(['/']);
    }
  }

  turnLeft() {
    this.game.turnLeft();
  }
  turnRigth() {
    this.game.turnRight();
  }

  goForward() {
    this.game.moveForward();
  }

  getPerceptions() {
    return Array.from(this.game.getPerceptions(), ([key, value]) => ({
      key,
      value,
    })).map((val) => {
      let res = 'Nada';
      switch (val.key) {
        case Perception.Wumpus:
          res = 'Wumpus';
          break;
        case Perception.Stench:
          res = 'Olor';
          break;
        case Perception.Scream:
          res = 'Grito';
          break;

        case Perception.Pit:
          res = 'Hoyo';
          break;
        case Perception.Breeze:
          res = 'Briza';
          break;
        case Perception.Glitter:
          res = 'Brillante';
          break;
        case Perception.Exit:
          res = 'Salida';
          break;
      }
      return res;
    });
  }

  throwArrow() {
    this.game.throwArrow();
  }

  gameFinish() {
    setTimeout(() => {
      if(this.game.gameFinish()){
        this.route.navigate(['game-over']);
      }
    },3000)
    return this.game.gameFinish();
  }

  getValues(room: Room){
    
  }

}
