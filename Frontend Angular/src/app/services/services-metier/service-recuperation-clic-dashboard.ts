import { Injectable } from '@angular/core';
import { NewPointAdd } from '../../interfaces/new-point-add';
import { ServiceEventClicDashboard } from '../services-event/service-clic-dashboard';
import { Router } from '@angular/router';
import { Map } from '../../pages/map/map';

@Injectable({
  providedIn: 'root',
})
export class ServiceRecuperationClicDashboard {

  constructor(
    private serviceEventClicDashboard: ServiceEventClicDashboard,
    private router: Router
  ){}

  recuperationLigneCliquer(geomGeoJsonDuPointCliquer: any): void{

    // conversion du string geoGeoJson en objet Json, 
    // pour pouvoir récupérer les coordonnées du point : 
    let objetGeojson: any = JSON.parse(geomGeoJsonDuPointCliquer);
    
    // récuperation du tableau avec les coordonnées du point du tableau Dashboard:
    const tableauCoordonneesPoint: number[] = objetGeojson.coordinates;

    const pointCliquer: NewPointAdd = {

      coordonneLongitude: tableauCoordonneesPoint[0], 
      coordonneLatitude: tableauCoordonneesPoint[1]

    };
 
    // appel du serviceEventClicDashboard pour notifier et envoyer ce point cliquer
    // à la page Map pour qu'elle zoom sur ce point:

    this.serviceEventClicDashboard.notifPointClique(pointCliquer);

    // redirection vers la page Map pour afficher le point avec un zoom sur lui:
    this.router.navigate(['']);
    
  }

}
