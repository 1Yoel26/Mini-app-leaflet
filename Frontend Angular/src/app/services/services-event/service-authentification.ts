import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceAuthentification {


  private behaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public behaviorSubjectObservable: Observable<boolean> = this.behaviorSubject.asObservable();


  constructor(){
    let tokenJwt: string | null = localStorage.getItem("tokenJwt");

    if(tokenJwt){
      this.nextConnecter();
    }
  }
  

  public nextConnecter():void{

      this.behaviorSubject.next(true);

  }


  public nextDeconnecter():void{

      localStorage.removeItem("tokenJwt");

      //localStorage.clear();
      this.behaviorSubject.next(false);

  }


  public estConnecteOuPas(): boolean{

    return this.behaviorSubject.value;

  }

}
