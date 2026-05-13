import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { FormulairePoint } from '../../components/formulaire-point/formulaire-point';
import { MatDialog } from '@angular/material/dialog';
import { ServiceLeaflet } from '../../services/services-metier/service-leaflet';
import { ServicePointsStorage } from '../../services/services-stockage/service-points-storage';
import { ServiceEventSubject } from '../../services/services-event/service-event-subject';
import { NewPointAdd } from '../../interfaces/new-point-add';
import { ServiceEventClicDashboard } from '../../services/services-event/service-clic-dashboard';

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
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.scss', 
})
export class Map implements AfterViewInit {

  constructor(
    private matDialog: MatDialog,
    private serviceLeaflet: ServiceLeaflet,
    private servicePointsStorage: ServicePointsStorage,
    private serviceEventSubject : ServiceEventSubject,
    private serviceEventClicDashboard: ServiceEventClicDashboard
  ){}

  // propriété de type L.Map qui est le type dans Leaflet pour afficher la carte:
  private maCarte!: L.Map;

  // charger la carte Leaflet, uniquement une fois que le DOM Html est chargé (car Leaflet à besoin du DOM Html)
  ngAfterViewInit(): void {


    // appel de la fonction pour retourner et afficher la carte Leaflet:
    this.maCarte = this.serviceLeaflet.afficherLaCarte("divMaCarte");

    // appel de la fonction pour : 
    // - récuperer le point cliqué par l'utilisateur
    // - et afficher une popup avec le formulaire de description dessus :
    this.serviceLeaflet.recupererLePointCliquer(this.maCarte, this.matDialog)

    // appel de la fonction pour récuperer et ajouter une couche depuis PostgreSQL
    //this.serviceLeaflet.recupererEtAfficherUneCouche("couche1_apprentissage_api", this.maCarte);

    // appel de la fonction pour ajouter automatiquement toutes les couches de la Bdd sur la carte Leaflet:
    this.serviceLeaflet.ajouterToutesLesCouches(this.maCarte);


    // appel de la fonction pour ajouter la couche avec les points cliqués sur la carte:
    this.serviceLeaflet.recupererEtAfficherLaCoucheAvecLesPointsCliquer(this.maCarte);
    

    // à chaque ajout d'un point par l'utilisateur, 
    // ajout de ce point via le servicePointStorage et le serviceEventSubject :

    this.serviceEventSubject.notifAddPointObservable$.subscribe(

      (newPointAdd: NewPointAdd)=>{
        const coordonneeLongitude: number = newPointAdd.coordonneLongitude;
        const coordonneeLatitude: number = newPointAdd.coordonneLatitude;

        this.serviceLeaflet.ajouterUnPoint(coordonneeLongitude, coordonneeLatitude, this.maCarte);
      }

    );


    this.serviceEventClicDashboard.notifClicDashboard$.subscribe(
      (tableauCoordonneesPoint: NewPointAdd | null)=>{
        this.serviceLeaflet.zoomSurUnPoint(this.maCarte, tableauCoordonneesPoint);
      }
    );

    
    


  }

  

}
