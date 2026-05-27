import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PointAndDescriptionDto } from '../../interfaces/point-and-description-dto';

@Injectable({
  providedIn: 'root',
})
export class ServiceCouche {

  constructor(private httpClient: HttpClient){}

  private cheminHttp: string = "http://localhost:8080/api-leaflet/couche";

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

    return this.httpClient.get<any[]>(this.cheminHttp + "/uneCouche/" + nomDeLaCouche);

  }

  

  // service qui récupere la couche avec les points cliqué des utilisateurs sous forme de liste any[] pour la liste de Map<String, Object> envoyé par l'API Java
  public recupereLaCouchePointAndDescription() : Observable<any[]> {

    return this.httpClient.get<any[]>(this.cheminHttp + "/getCouchePoints");

  }


  // service qui récupere la couche avec les points filtré par la description
  public recupereLaCouchePointFiltreByDescription(motAChercher: string) : Observable<any[]> {

    return this.httpClient.get<any[]>(this.cheminHttp + "/filtreByDescription/" + motAChercher);

  }

  
  // service qui enregistre le point + la description en Bdd:
  public enregistrementFormulaireEnBdd(infosPointAndDescription: PointAndDescriptionDto): Observable<void>{
    return this.httpClient.post<void>(this.cheminHttp + "/saveNewPointAndDescription", infosPointAndDescription);
  }

}
