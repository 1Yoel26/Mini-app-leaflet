import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceEventFiltre {

  private subjectFiltre: BehaviorSubject<string> = new BehaviorSubject<string>("");

  public observableSubjectFiltre$ = this.subjectFiltre.asObservable();

  next(texteAChercher: string){

    this.subjectFiltre.next(texteAChercher);

  }

}
