import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { FormulairePoint } from '../../components/formulaire-point/formulaire-point';
import { MatDialog } from '@angular/material/dialog';

// code nécéssaire pour avoir le chemin correct des icones de Leaflet dans la carte :
// suppression des chemins des icones définis par défaut dans Leaflet qui sont incorrect avec Angular : 
delete (L.Icon.Default.prototype as any)._getIconUrl;

// puis définitions des chemins corrects précis pour chaque icones Leaflet:
L.Icon.Default.mergeOptions({
  iconUrl: 'assets/leaflet/marker-icon.png',
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png',
});


@Component({
  selector: 'app-map',
  imports: [FormulairePoint],
  templateUrl: './map.html',
  styleUrl: './map.scss', 
})
export class Map implements AfterViewInit {

  constructor(private matDialog: MatDialog){}

  // propriété de type L.Map qui est le type dans Leaflet pour afficher la carte:
  maCarte!: L.Map;

  // charger la carte Leaflet, uniquement une fois que le DOM Html est chargé (car Leaflet à besoin du DOM Html)
  ngAfterViewInit(): void {

    // appel de la fonction pour afficher la carte, définis juste en dessous
    this.afficherLaCarte();

    // appel de la fonction pour récuperer le point cliqué par l'utilisateur:
    this.recupererLePoint();

  }

  // fonction qui crée la carte Leaflet dans le div : id="divMaCarte" (dans le map.html)
  afficherLaCarte(): void {

    // création de la carte pointé sur les chutes du Niagara par défaut:
    this.maCarte = L.map('divMaCarte').setView([43.0799, -79.0747], 15);

    // ajout des tuiles de la carte du monde en fond d'écran de la carte Leaflet: 
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.maCarte);
    
  }


  recupererLePoint(): void{

    let pointLatitude: number;
    let pointLongitude: number;


    this.maCarte.on("click", (evenementLeflet: L.LeafletMouseEvent)=>{

      this.matDialog.open(FormulairePoint);

      pointLatitude = evenementLeflet.latlng.lat;
      pointLongitude = evenementLeflet.latlng.lng;

      L.marker([pointLatitude, pointLongitude]).addTo(this.maCarte);

    })

  }


}
