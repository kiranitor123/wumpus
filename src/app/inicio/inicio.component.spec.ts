import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

import { InicioComponent } from './inicio.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;

  beforeEach(async() => {
    
    await TestBed.configureTestingModule({
      declarations: [ InicioComponent ],
      imports:[
        FormsModule,
        ReactiveFormsModule 
      ],
      providers: [
        { provide: GameService},
        { provide: Router},
        { provide: FormBuilder}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });
});
