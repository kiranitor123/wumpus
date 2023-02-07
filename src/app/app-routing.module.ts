import { InicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameOverComponent } from './game-over/game-over.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  {
    path:"begin",
    component: InicioComponent
  },
  {
    path:"game-over",
    component: GameOverComponent
  },
  {
    path: "game",
    component: GameComponent
  },
  {path: '', redirectTo:'/begin', pathMatch:"full"},
  {path: '**', redirectTo:'/begin', pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
