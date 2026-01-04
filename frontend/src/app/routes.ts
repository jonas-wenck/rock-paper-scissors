import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Game } from './game/game';
import { GameRecords } from './game-records/game-records';

const routeConfig: Routes = [
  {
    path: '',
    component: Home,
    title: 'Rock, Paper, Scissors - enter your name',
  },
  {
    path: 'game/:playerName',
    component: Game,
    title: 'Rock, Paper, Scissors - select your symbol',
  },
  {
    path: 'game-records',
    component: GameRecords,
    title: 'Rock, Paper, Scissors - game records',
  },
];
export default routeConfig;
