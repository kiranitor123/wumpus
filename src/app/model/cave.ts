import { Direction } from './directions';
import { Perception } from './perceptions';
import { Room, WumpusRoom, PitRoom, GoldRoom, ExitRoom } from './room';

export class Cave {
  public size: number;
  public grids: Room[][];

  constructor(size: number, wumpus: number, pits: number) {
    this.size = size;
    this.grids = Array.from(Array(size), () => new Array(size));

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        this.grids[i][j] = new Room(i, j);
      }
    }

    while (wumpus > 0) {
      const x = this.getRandomIntInRange();
      const y = this.getRandomIntInRange();

      if (this.preventSetInExit(x, y)) {
        continue;
      }

      let room = this.grids[x][y];

      if (room.getPerception() === Perception.None) {
        this.grids[x][y] = new WumpusRoom(room.x, room.y);
        wumpus--;
      }
    }

    while (pits > 0) {
      const x = this.getRandomIntInRange();
      const y = this.getRandomIntInRange();

      if (this.preventSetInExit(x, y)) {
        continue;
      }
      let room = this.grids[x][y];

      if (room.getPerception() === Perception.None) {
        this.grids[x][y] = new PitRoom(room.x, room.y);
        pits--;
      }
    }

    let gold = 1;

    while (gold > 0) {
      const x = this.getRandomIntInRange();
      const y = this.getRandomIntInRange();

      if (this.preventSetInExit(x, y)) {
        continue;
      }
      let room = this.grids[x][y];

      if (room.getPerception() === Perception.None) {
        this.grids[x][y] = new GoldRoom(room.x, room.y);
        gold--;
      }
    }

    this.grids[this.size - 1][0] = new ExitRoom(this.size - 1, 0);
  }

  public getRoom(x: number, y: number) {
    return this.grids[x][y];
  }

  public grabGold(x: number, y: number) {
    const room = this.grids[x][y];

    if (room.getPerception() === Perception.Glitter) {
      this.grids[x][y] = new Room(x, y);
      return true;
    }

    return false;
  }

  public canAccessArrayPosition(row: number, col: number) {
    const rowMax = this.size - 1;
    const colMax = this.size - 1;
    return row >= 0 && row <= rowMax && col >= 0 && col <= colMax;
  }

  public throwArcherArrow(row: number, col: number, direction: Direction): Perception {
    const rowMax = this.size - 1;
    const colMax = this.size - 1;
    let result: Perception = Perception.None;

    switch (direction) {
      case Direction.North:
        for (let i = row; i >= 0; i--) {
          if (this.grids[i][col].getPerception() === Perception.Wumpus) {
            result = Perception.Scream;
            this.grids[i][col] = new Room(i, col);
            break;
          }
        }
        break;
      case Direction.South:
        for (let i = row; i <= rowMax; i++) {
          if (this.grids[i][col].getPerception() === Perception.Wumpus) {
            result = Perception.Scream;
            this.grids[i][col] = new Room(i, col);
            break;
          }
        }
        break;
      case Direction.East:
        for (let i = col; i <= colMax; i++) {
          if (this.grids[row][i].getPerception() === Perception.Wumpus) {
            result = Perception.Scream;
            this.grids[row][i] = new Room(row, i);
            break;
          }
        }
        break;
      case Direction.West:
        for (let i = col; i >= 0; i--) {
          if (this.grids[row][i].getPerception() === Perception.Wumpus) {
            result = Perception.Scream;
            this.grids[row][i] = new Room(row, i);
            break;
          }
        }
        break;
    }
    return result;
  }

  private getRandomIntInRange() {
    return Math.floor(Math.random() * this.size);
  }

  private preventSetInExit(x: number, y: number) {
    return y === 0 && x === this.size - 1;
  }
}
