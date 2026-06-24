import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceAuthentification {


  private behaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public behaviorSubjectObservable: Observable<boolean> = this.behaviorSubject.asObservable();


  constructor(private router: Router){
    let tokenJwt: string | null = localStorage.getItem("tokenJwt");

    if(tokenJwt){
      this.nextConnecter();
    }
  }
  

  public nextConnecter():void{

      this.behaviorSubject.next(true);
      this.router.navigate(['']);

  }


  public nextDeconnecter():void{

      localStorage.removeItem("tokenJwt");

      //localStorage.clear();
      this.behaviorSubject.next(false);

      this.router.navigate(['/authentification']);

  }


  public estConnecteOuPas(): boolean{

    return this.behaviorSubject.value;

  }

}
