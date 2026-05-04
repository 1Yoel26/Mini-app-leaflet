import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

// Service pour stocker les coordonnées du point cliqué par l'utilisateur
// afin de pouvoir partager ces informations entre les components de l'app:
export class ServicePointsStorage {

  private coordonneeLatitude!: number;
  private coordonneeLongitude!: number;

  public setPoints(latitude: number, longitude: number) :void{
    this.coordonneeLatitude = latitude;
    this.coordonneeLongitude = longitude;
  }

  public getPoints(): {latitude: number, longitude: number} {

    return {
      latitude : this.coordonneeLatitude,
      longitude: this.coordonneeLongitude
    };
  }
}
