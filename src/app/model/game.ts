import { Perception } from './perceptions';
import { Cave } from './cave';
import { Direction } from './directions';
import { Hunter } from './hunter';
export class Game {
  public gameOver = false;
  public isGameInit = false;
  public win = false;
  public logs = '';
  public perceptions = new Map<Perception, Perception>();

  public cave!: Cave;
  public hunter!: Hunter;

  constructor() {
  }

  public initGame(size: number, wumpus: number, pits: number, arrows: number) {
    this.cave = new Cave(size, wumpus, pits);
    this.hunter = new Hunter([0, size - 1], arrows);
    this.isGameInit = true;
    this.gameOver = false;
    this.win = false;
    this.logs = '';
    this.setLogsDirection(this.hunter.direction);
    this.perceptions = this.getNearPerceptions();
    this.setCurrentPerception();
  }

  public turnLeft() {
    this.setLogsDirection(this.hunter.turnLeft());
    this.getNearPerceptions();
    this.setCurrentPerception();
  }

  public turnRight() {
    this.setLogsDirection(this.hunter.turnRight());
    this.getNearPerceptions();
    this.setCurrentPerception();
  }

  public gameIsFinish() {
    return this.win || this.gameOver;
  }

  public hunterMoveForward() {
    const move = this.hunter.attemptTomoveForward();
    const canMove = this.cave.canAccessArrayPosition(move[1], move[0]);

    if (canMove) {
      this.hunter.moveForward();
      this.getNearPerceptions();
      this.setCurrentPerception();
      this.updateHunter();
    } else {
      this.logs = 'Hay una pared';
    }
  }

  public throwArrow() {
    if(this.hunter.throwArrow()) {
      const postion = this.hunter.position;
      const perception = this.cave.throwArcherArrow(postion[1], postion[0], this.hunter.direction);
    
      if(perception === Perception.Scream){
        this.logs= 'Mataste a un wumpus';
      } else {
        this.logs= 'No paso nada tienes '+this.hunter.amountArrow +' flechas';
      }
    } else {
      this.logs= 'Ya no tienes Flechas';
    }
  }

  private updateHunter() {
    if (this.perceptions.get(Perception.Wumpus) === Perception.Wumpus) {
      this.logs= 'Hay un wumpus, moriste';
      this.gameOver = true;
      return;
    }

    if(!!this.perceptions.get(Perception.Pit)){
      this.logs= 'Hay un agujero, moriste';
      this.gameOver = true;
      return;
    }

    if(!!this.perceptions.get(Perception.Glitter)){
      const postion = this.hunter.position;
      this.logs= 'Encontraste el Tesoro, lo tomas';
      this.hunter.hasGold = this.cave.grabGold(postion[1], postion[0]);
    }

    if(!!this.perceptions.get(Perception.Exit)) {
      if(this.hunter.hasGold){
        this.logs= 'Felicidades, lo lograste';
        this.win = true;
        return;
      }
      this.logs= 'Necesitas Buscar el tesoro.';
      return;
    }
  }

  private setCurrentPerception() {
    const postion = this.hunter.position;
    const actual = this.cave.getRoom(postion[1], postion[0]).getPerception();
    this.perceptions.set(actual, actual);
  }

  private getNearPerceptions() {
    const postion = this.hunter.position;
    const perceptionMap = new Map<Perception, Perception>();
    this.perceptions = perceptionMap;
    if (postion[0] > 0) {
      const exist = this.cave.canAccessArrayPosition(
        postion[1],
        postion[0] - 1
      );
      if (exist) {
        const room = this.cave.getRoom(postion[1], postion[0] - 1);
        perceptionMap.set(room.getNearPerception(), room.getNearPerception());
      }
    }
    if (postion[0] < this.cave.size - 1) {
      const exist = this.cave.canAccessArrayPosition(
        postion[1],
        postion[0] + 1
      );
      if (exist) {
        const room = this.cave.getRoom(postion[1], postion[0] + 1);
        perceptionMap.set(room.getNearPerception(), room.getNearPerception());
      }
    }
    if (postion[1] > 0) {
      const exist = this.cave.canAccessArrayPosition(
        postion[1] - 1,
        postion[0]
      );
      if (exist) {
        const room = this.cave.getRoom(postion[1] - 1, postion[0]);
        perceptionMap.set(room.getNearPerception(), room.getNearPerception());
      }
    }
    if (postion[1] < this.cave.size - 1) {
      const exist = this.cave.canAccessArrayPosition(
        postion[1] + 1,
        postion[0]
      );
      if (exist) {
        const room = this.cave.getRoom(postion[1] + 1, postion[0]);
        perceptionMap.set(room.getNearPerception(), room.getNearPerception());
      }
    }

    return perceptionMap;
  }

  private setLogsDirection(direction: Direction) {
    switch (direction) {
      case Direction.North:
        this.logs = 'Mirando al Norte';
        break;
      case Direction.South:
        this.logs = 'Mirando al Sur';
        break;
      case Direction.East:
        this.logs = 'Mirando al Este';
        break;
      case Direction.West:
        this.logs = 'Mirando al Oeste';
        break;
    }
  }
}
