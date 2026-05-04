import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PointAndDescription } from '../interfaces/point-and-description';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class ServiceFormulairePoint {

  private cheminHttp: string = "http://localhost:8080/api-leaflet";
  
  constructor(private httpClient: HttpClient){}

  public enregistrementFormulaireEnBdd(infosPointAndDescription: PointAndDescription): Observable<void>{
    return this.httpClient.post<void>(this.cheminHttp + "/saveNewPointAndDescription", infosPointAndDescription);
  }

}
