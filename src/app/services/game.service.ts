import { Injectable } from '@angular/core';
import { Game } from '../model/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private game: Game;

  constructor() {
    this.game = new Game();
  }

  startGame(size: number, wumpus: number, pits: number, arrows: number) {
    this.game.initGame(size, wumpus, pits, arrows);
  }

  getPerceptions() {
    return this.game.perceptions;
  }

  turnLeft() {
    this.game.turnLeft();
  }

  turnRight() {
    this.game.turnRight();
  }

  moveForward() {
    this.game.hunterMoveForward();
  }

  getLogs() {
    return this.game.logs;
  }

  getBoard() {
    return this.game.cave.grids;
  }

  getHunterPosition() {
    return this.game.hunter.position;
  }

  throwArrow() {
    this.game.throwArrow();
  }

  gameFinish() {
    return this.game.gameIsFinish();
  }

  gameInProgress() {
    return this.game.isGameInit;
  }

  playerWin() {
    return this.game.win;
  }

}
