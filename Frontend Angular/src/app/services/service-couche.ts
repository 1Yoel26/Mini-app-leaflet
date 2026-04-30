import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceCouche {

  constructor(private httpClient: HttpClient){}

  private cheminHttp: string = "http://localhost:8080/api-leaflet";

  // service qui récupere une couche sous forme de liste any[] pour la liste de Map<String, Object> envoyé par l'API Java
  public recupereUneCouche() : Observable<any[]> {

    return this.httpClient.get<any[]>(this.cheminHttp);

  }

}
