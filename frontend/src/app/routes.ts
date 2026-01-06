import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Game } from './game/game';
import { GameRecords } from './game-records/game-records';

const routeConfig: Routes = [
  {
    path: '',
    component: Home,
    title: 'Enter your name | Rock, Paper, Scissors',
  },
  {
    path: 'game/:playerName',
    component: Game,
    title: 'Select your symbol | Rock, Paper, Scissors',
  },
  {
    path: 'game-records',
    component: GameRecords,
    title: 'Game records | Rock, Paper, Scissors',
  },
];
export default routeConfig;
