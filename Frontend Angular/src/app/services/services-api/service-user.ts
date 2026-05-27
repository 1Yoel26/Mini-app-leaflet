import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCreationCompte } from '../../interfaces/user-creation-compte';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceUser {

  constructor(private httpClient: HttpClient){}

  private cheminHttp: string = "http://localhost:8080/api-leaflet/user";

  addNewCompte(infoCompte: UserCreationCompte): Observable<boolean>{

    return this.httpClient.post<boolean>( this.cheminHttp + "/addUser", infoCompte);

  }

}
