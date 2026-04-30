import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceCouche {

  constructor(private httpClient: HttpClient){}

  private cheminHttp: string = "http://localhost:8080/api-leaflet";

  // service qui récupere une liste avec toutes les couches sous forme de liste de liste any[] pour la liste de List<Map<String, Object>> envoyé par l'API Java
  public recuperetoutesLesCouche() : Observable<any[][]> {

    return this.httpClient.get<any[][]>(this.cheminHttp);

  }

  

  // service qui récupère une liste avec tous les noms des tables/couches de la Bdd 
  // pour pouvoir faire ensuite une boucle qui ajoute chaque couche à la carte automatiquement :
  public recupereLeNomDesCouches(): Observable<string[]>{
    return this.httpClient.get<string[]>(this.cheminHttp + "/listeDesTables");
  }


  // service qui récupere une couche sous forme de liste any[] pour la liste de Map<String, Object> envoyé par l'API Java
  public recupereUneCouche(nomDeLaCouche: string) : Observable<any[]> {

    return this.httpClient.get<any[]>(this.cheminHttp + "/" + nomDeLaCouche);

  }

}
