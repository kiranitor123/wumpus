import { Direction } from "./directions";

export class Hunter {
  public position: [number, number];
  public direction: Direction = Direction.North;
  public hasArrow = false;
  public hasGold = false;
  public amountArrow = 0;

  constructor(position: [number, number], amountArrow: number) {
    this.position = position;
    this.amountArrow = amountArrow;

    if (this.amountArrow > 0) {
      this.hasArrow = true;
    }
  }

  moveForward() {
    switch (this.direction) {
      case Direction.North:
        this.position[1] -= 1;
        break;
      case Direction.East:
        this.position[0] += 1;
        break;
      case Direction.South:
        this.position[1] += 1;
        break;
      case Direction.West:
        this.position[0] -= 1;
        break;
    }
  }

  attemptTomoveForward() {
    let move = [...this.position];
    switch (this.direction) {
      case Direction.North:
        move[1] -= 1;
        break;
      case Direction.East:
        move[0] += 1;
        break;
      case Direction.South:
        move[1] += 1;
        break;
      case Direction.West:
        move[0] -= 1;
        break;
    }
    return move;
  }

  turnLeft() {
    this.direction = (this.direction + 3) % 4;
    return this.direction;
  }

  turnRight() {
    this.direction = (this.direction + 1) % 4;
    return this.direction;
  }

  throwArrow() {
    if (this.hasArrow && this.amountArrow > 0) {
      this.amountArrow--;
      return true;
    }
    return false;
  }
}

