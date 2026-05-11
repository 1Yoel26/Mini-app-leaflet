import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NewPointAdd } from '../../interfaces/new-point-add';

@Injectable({
  providedIn: 'root',
})
export class ServiceEventSubject {

  private notifAddPointSubject: Subject<NewPointAdd> = new Subject<NewPointAdd>();

  public notifAddPointObservable$ : Observable<NewPointAdd> = this.notifAddPointSubject.asObservable();

  
  notifAddNewPoint(newPoint: NewPointAdd): void{

    this.notifAddPointSubject.next(newPoint);

  }

}
