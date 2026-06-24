import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from "@angular/router";
import { ServiceAuthentification } from '../../services/services-event/service-authentification';


@Component({
  selector: 'app-menu',
  imports: [MatToolbar, MatButton, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {

  constructor(
    private serviceAuthentification: ServiceAuthentification,
    private router: Router
  ){
  }

  deconnecter(): void{
    this.serviceAuthentification.nextDeconnecter();
  }

  connecteOuPas(): boolean{
    return this.serviceAuthentification.estConnecteOuPas();
  }

}
