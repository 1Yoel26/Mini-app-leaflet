import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { ServiceCouche } from './service-couche';
import { MatDialog } from '@angular/material/dialog';
import { FormulairePoint } from '../components/formulaire-point/formulaire-point';

@Injectable({
  providedIn: 'root',
})


// Service leaflet pour executer des fonctions utiles sur la carte leaflet :
export class ServiceLeaflet {

  // appel du : ServiceCouche, dans : ServiceLeaflet, 
  // pour par exemple récuperer une couche de la Bdd:
  constructor(
        private serviceCouche: ServiceCouche
  ){}


  // Fonction 1 :
  // qui crée et retourne : la carte Leaflet dans le div : id="divMaCarte" (dans le map.html)
  afficherLaCarte(idDivConteneur: string): L.Map {

    // création de la carte pointé sur les chutes du Niagara par défaut:
    const maCarte: L.Map = L.map(idDivConteneur).setView([43.0799, -79.0747], 15);

    // ajout des tuiles de la carte du monde en fond d'écran de la carte Leaflet: 
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(maCarte);

    return maCarte;
    
  }



  // Fonction 2 :
  // pour ajouter une couche sur la carte leaflet, depuis la bdd:
  ajouterUneCouche(maCarte: L.Map): void{

    this.serviceCouche.recupereUneCouche().subscribe( (listeDesMapsDeLaCouche)=>{

      // récupération uniquement de la propriété .geomgeojson
      // puis la convertir avec le JSON.parse()

      const contenuJsonDeGeomJson: any = listeDesMapsDeLaCouche.map(proprieteDeLaCouche => {
        return JSON.parse(proprieteDeLaCouche.geomgeojson);
      })

      const coucheCreer = L.geoJSON(contenuJsonDeGeomJson, {
        style: {
          color: 'blue',
          weight: 3,
          fillOpacity: 0.5
        }
      }).addTo(maCarte);

      maCarte.fitBounds(coucheCreer.getBounds());

    });

  }

  // Fonction 3 :
  // pour récupérer la zonne cliqué sur la carte, et y ajouter
  // un point sur la carte à cet endroit + un formulaire de description pour l'utilisateur :
  recupererLePoint(maCarte: L.Map, matDialog: MatDialog): void{

    let pointLatitude: number;
    let pointLongitude: number;

    // écoute de l'évenement Click sur la carte Leaflet :
    maCarte.on("click", (evenementLeflet: L.LeafletMouseEvent)=>{

      // après chaque click détecté, ouverture de la popup avec le component FormulairePoint dedans:
      matDialog.open(FormulairePoint);

      // récupération des coordonnées du point cliqué
      pointLatitude = evenementLeflet.latlng.lat;
      pointLongitude = evenementLeflet.latlng.lng;

      // ajout du point sur la carte Leaflet:
      L.marker([pointLatitude, pointLongitude]).addTo(maCarte);

    })

  }


}
