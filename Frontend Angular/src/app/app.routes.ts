import { Routes } from '@angular/router';
import { Map } from './pages/map/map';
import { Dashboard } from './pages/dashboard/dashboard';


export const routes: Routes = [
    { path: "", component: Map },
    { path: "dashboard", component: Dashboard }
];
