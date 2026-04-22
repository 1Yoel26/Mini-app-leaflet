import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.scss', 
})
export class Map implements AfterViewInit {

  // propriété de type L.Map qui est le type dans Leaflet pour afficher la carte:
  maCarte!: L.Map;

  // charger la carte Leaflet, uniquement une fois que le DOM Html est chargé (car Leaflet à besoin du DOM Html)
  ngAfterViewInit(): void {

    // appel de la fonction pour afficher la carte, définis juste en dessous
    this.afficherLaCarte();

  }

  // fonction qui crée la carte Leaflet dans le div : id="divMaCarte" (dans le map.html)
  afficherLaCarte(): void {

    // création de la carte pointé sur les chutes du Niagara par défaut:
    this.maCarte = L.map('divMaCarte').setView([43.0799, -79.0747], 15);

    // ajout des tuiles de la carte du monde en fond d'écran de la carte Leaflet: 
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.maCarte);
    
  }


}
