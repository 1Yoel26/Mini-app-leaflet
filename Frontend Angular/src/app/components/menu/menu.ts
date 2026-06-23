import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";
import { ServiceAuthentification } from '../../services/services-event/service-authentification';


@Component({
  selector: 'app-menu',
  imports: [MatToolbar, MatButton, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {

  constructor(public serviceAuthentification: ServiceAuthentification){
  }

}
