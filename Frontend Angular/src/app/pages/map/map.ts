import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { FormulairePoint } from '../../components/formulaire-point/formulaire-point';
import { MatDialog } from '@angular/material/dialog';
import { ServiceCouche } from '../../services/service-couche';
import { ServiceLeaflet } from '../../services/service-leaflet';

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

  constructor(
    private matDialog: MatDialog,
    private serviceLeaflet: ServiceLeaflet
  ){}

  // propriété de type L.Map qui est le type dans Leaflet pour afficher la carte:
  private maCarte!: L.Map;

  // charger la carte Leaflet, uniquement une fois que le DOM Html est chargé (car Leaflet à besoin du DOM Html)
  ngAfterViewInit(): void {

    // appel de la fonction pour retourner et afficher la carte Leaflet:
    this.maCarte = this.serviceLeaflet.afficherLaCarte("divMaCarte");

    // appel de la fonction pour récuperer le point cliqué par l'utilisateur:
    this.serviceLeaflet.recupererLePoint(this.maCarte, this.matDialog)

    // appel de la fonction pour récuperer et ajouter une couche depuis PostgreSQL
    //this.serviceLeaflet.recupererEtAfficherUneCouche("couche1_apprentissage_api", this.maCarte);

    // appel de la fonction pour ajouter automatiquement toutes les couches de la Bdd sur la carte Leaflet:
    this.serviceLeaflet.ajouterToutesLesCouches(this.maCarte);


   

  }

  

}
