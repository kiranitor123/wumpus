import { Perception } from "./perceptions";

export class Room {
  public x: number;
  public y: number;
  public name: string ='N';

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getPerception() {
    return Perception.None;
  }

  getNearPerception() {
    return Perception.None;
  }
}

export class WumpusRoom extends Room {
  constructor(x: number, y: number) {
    super(x, y);
    this.name = 'W';
  }

  override getPerception(): Perception {
    return Perception.Wumpus;
  }

  override getNearPerception(): Perception {
    return Perception.Stench;
  }
}

export class PitRoom extends Room {
  constructor(x: number, y: number) {
    super(x, y);
    this.name = 'P';
  }

  override getPerception(): Perception {
    return Perception.Pit;
  }

  override getNearPerception(): Perception {
    return Perception.Breeze;
  }
}

export class GoldRoom extends Room {
  constructor(x: number, y: number) {
    super(x, y);
    this.name = 'G';
  }

  override getPerception(): Perception {
    return Perception.Glitter;
  }
}

export class ExitRoom extends Room {
  constructor(x: number, y: number) {
    super(x, y);
    this.name = 'E';
  }

  override getPerception(): Perception {
    return Perception.Exit;
  }
}
