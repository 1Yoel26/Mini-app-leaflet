import { Routes } from '@angular/router';
import { Map } from './pages/map/map';
import { Dashboard } from './pages/dashboard/dashboard';
import { Authentification } from './pages/authentification/authentification';
import { CreationCompte } from './pages/creation-compte/creation-compte';
import { authenticatedGuard } from './guards/authenticated-guard';


export const routes: Routes = [
    { path: "", component: Map},
    { path: "dashboard", component: Dashboard},
    { path: "authentification", component: Authentification},
    { path: "creation-compte", component: CreationCompte}
];
