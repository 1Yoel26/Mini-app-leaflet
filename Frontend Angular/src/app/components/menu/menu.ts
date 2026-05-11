import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";
import { Map } from '../../pages/map/map';
import { Dashboard } from '../../pages/dashboard/dashboard';

@Component({
  selector: 'app-menu',
  imports: [MatToolbar, MatButton, RouterLink, Map, Dashboard],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {}
