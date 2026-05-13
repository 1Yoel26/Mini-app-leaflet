import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NewPointAdd } from '../../interfaces/new-point-add';

@Injectable({
  providedIn: 'root',
})
export class ServiceEventClicDashboard {

  private notifClicDashboard : BehaviorSubject<NewPointAdd | null> = new BehaviorSubject<NewPointAdd | null>(null);

  public notifClicDashboard$ = this.notifClicDashboard.asObservable();


  notifPointClique(pointClique: NewPointAdd) : void{

    return this.notifClicDashboard.next(pointClique);
    
  }

}
