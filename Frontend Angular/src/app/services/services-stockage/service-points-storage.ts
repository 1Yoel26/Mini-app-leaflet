import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

// Service pour stocker les coordonnées du point cliqué par l'utilisateur
// afin de pouvoir partager ces informations entre les components de l'app:
export class ServicePointsStorage {

  private coordonneeLongitude!: number;
  private coordonneeLatitude!: number;

  public setPoints(longitude: number, latitude: number) :void{
    this.coordonneeLongitude = longitude;
    this.coordonneeLatitude = latitude;
  }

  public getPoints(): {longitude: number, latitude: number, } {

    return {
      longitude: this.coordonneeLongitude,
      latitude : this.coordonneeLatitude
    };
  }

}
