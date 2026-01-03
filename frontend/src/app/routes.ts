import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Game} from "./game/game";

const routeConfig: Routes = [
    {
        path: '',
        component: Home,
        title: 'Player configuration',
    },
    {
        path: 'game/:playerName',
        component: Game,
        title: 'Play game',
    },
];
export default routeConfig;