import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  initiGameForm = this.formBuilder.group({
    size: '',
    wumpus: '',
    pits: '',
    arrows: '',
  });

  constructor(private formBuilder: FormBuilder,
    private game: GameService, private route: Router) { }

  ngOnInit(): void {
  }

  createNewGame() {
    if(!this.initiGameForm.valid){
      alert('Llene todos los campos');
      return;
    }

    const {size, wumpus, pits, arrows} = this.initiGameForm.value;

    if(size*size < wumpus + pits) {
      alert('Configuracion no valida')
      return;
    }
    
    this.game.startGame(size,wumpus,pits,arrows);
    this.route.navigate(['/game'])
  }

}
