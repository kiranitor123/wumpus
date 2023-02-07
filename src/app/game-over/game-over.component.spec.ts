import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

import { GameOverComponent } from './game-over.component';

describe('GameOverComponent', () => {
  let component: GameOverComponent;
  let fixture: ComponentFixture<GameOverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: GameService},
        { provide: Router},
      ],
      declarations: [ GameOverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
