import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceCouche {

  constructor(private httpClient: HttpClient){}

  private cheminHttp: string = "/api-leaflet";

  public recupereUneCouche() : Observable<any[]> {

    return this.httpClient.get<any[]>(this.cheminHttp);

  }

}
