import { Routes } from '@angular/router';
import { Map } from './pages/map/map';
import { Dashboard } from './pages/dashboard/dashboard';
import { Authentification } from './pages/authentification/authentification';
import { CreationCompte } from './pages/creation-compte/creation-compte';
import { authenticatedGuard } from './guards/authenticated-guard';
import { guestGuard } from './guards/guest-guard';


export const routes: Routes = [
    { path: "", component: Map, canActivate: [authenticatedGuard]},
    { path: "dashboard", component: Dashboard, canActivate: [authenticatedGuard]},
    { path: "authentification", component: Authentification, canActivate: [guestGuard]},
    { path: "creation-compte", component: CreationCompte, canActivate: [guestGuard]}
];
