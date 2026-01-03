import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Game} from "./game/game";

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
];
export default routeConfig;