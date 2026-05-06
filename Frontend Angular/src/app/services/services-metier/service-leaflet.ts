import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { ServiceCouche } from '../services-api/service-couche';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormulairePoint } from '../../components/formulaire-point/formulaire-point';
import { ServicePointsStorage } from '../services-stockage/service-points-storage';

@Injectable({
  providedIn: 'root',
})


// Service leaflet pour executer des fonctions utiles sur la carte leaflet :
export class ServiceLeaflet {

  // appel du : ServiceCouche, dans : ServiceLeaflet, 
  // pour par exemple récuperer une couche de la Bdd:
  constructor(
        private serviceCouche: ServiceCouche,
        private servicePointsLocalStorage: ServicePointsStorage
  ){}


  // Fonction 1 :
  // qui crée et retourne : la carte Leaflet dans le div : id="divMaCarte" (dans le map.html)
  afficherLaCarte(idDivConteneur: string): L.Map {

    // création de la carte pointé sur les chutes du Niagara par défaut:
    const maCarte: L.Map = L.map(idDivConteneur).setView([43.0799, -79.0747], 16);

    // ajout des tuiles de la carte du monde en fond d'écran de la carte Leaflet: 
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(maCarte);

    return maCarte;
    
  }



  // Fonction 2 :
  // pour récupérer et ajouter une couche sur la carte leaflet, depuis la bdd:
  recupererEtAfficherUneCouche(nomDeLaCouche: string, maCarte: L.Map): void{

    this.serviceCouche.recupereUneCouche(nomDeLaCouche).subscribe( (listeDesMapsDeLaCouche)=>{

      // récupération uniquement de la propriété .geomgeojson
      // puis la convertir avec le JSON.parse()

      const contenuJsonDeGeomJson: any = listeDesMapsDeLaCouche.map(proprieteDeLaCouche => {
        return JSON.parse(proprieteDeLaCouche.geomgeojson);
      })

      // création de la couche à ajouter, puis ajout de cette couche sur la carte
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
  // pour recuperer et ajouter automatiquement toutes les couches/tables sur la carte leaflet, depuis la bdd:
  ajouterToutesLesCouches(maCarte: L.Map): void{

    this.serviceCouche.recuperetoutesLesCouche().subscribe(
      (listeDeToutesLesCouches: any[][])=>{

        // recupération d'une seule couche/table à la fois :
        for(const uneCouche of listeDeToutesLesCouches){

          // boucle sur chaque objet/ligne dans une couche/table
          for(const unObjetGeometrique of uneCouche){

            const objetGeometriqueStringConvertitEnJson = JSON.parse(unObjetGeometrique.geomgeojson);
            const coucheCrer : L.Layer = L.geoJSON(objetGeometriqueStringConvertitEnJson, {
              style : {
                color: 'red',
                fillColor: 'blue',
                weight: 2,
                fillOpacity: 0.5
              }
            });


            coucheCrer.addTo(maCarte);

          }

        }

      }
    );

  }


  // Fonction 4 :
  // pour : 
  // - récupérer la zonne cliqué sur la carte au moment du clic
  // - stocker les coordonnées de ce point ensuite dans le ServicePointsStorage
  // - et afficher une popup avec un formulaire de description pour l'utilisateur :
  
  recupererLePointCliquer(maCarte: L.Map, matDialog: MatDialog): void{

    let pointLatitude: number;
    let pointLongitude: number;

    // écoute de l'évenement Click sur la carte Leaflet :
    maCarte.on("click", (evenementLeflet: L.LeafletMouseEvent)=>{

      // après chaque click détecté, ouverture de la popup avec le component FormulairePoint dedans:
      matDialog.open(FormulairePoint);

      // récupération des coordonnées du point cliqué
      pointLongitude = evenementLeflet.latlng.lng;
      pointLatitude = evenementLeflet.latlng.lat;

      // stockage du point cliqué dans le service servicePointsStorage,
      // pour pouvoir l'ajouter sur la carte après enregistrement en Bdd du commentaire dessus:
      this.servicePointsLocalStorage.setPoints(pointLongitude, pointLatitude);


    })

  }


  // Fonction 5 :
  // pour : 
  // - récupérer la couche avec tous les points cliqués
  // - ajouter cette couche à la carte Leaflet
  
  recupererEtAfficherLaCoucheAvecLesPointsCliquer(maCarte: L.Map): void {

    this.serviceCouche.recupereLaCouchePointAndDescription().subscribe(
      (laCoucheDesPoints: any[])=>{
        for(let uneCoucheDePoint of laCoucheDesPoints){

          // conversion de l'objet string en objet Json compatible avec GeoJson
          const objetGeometriqueStringConvertitEnJson = JSON.parse(uneCoucheDePoint.geomgeojson);
          
          // création de la couche avec les points + ajout sur la carte Leaflet:
          L.geoJSON(objetGeometriqueStringConvertitEnJson, {
            // ajout de la description en etiquette sur chaque point de la couche:
            
          }).addTo(maCarte);


        }
      }
    );

  }


  // Fonction 6 : 
  // pour ajouter le nouveau point directement sur la carte de l'utilisateur (sans avoir besoin de le charger de la Bdd):
  ajouterUnPoint(coordonneeLongitude: number, coordonneeLatitude: number, maCarte: L.Map): void{

    L.marker([coordonneeLatitude, coordonneeLongitude]).addTo(maCarte);

  }



  



}
