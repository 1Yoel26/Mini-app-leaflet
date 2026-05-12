import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ServiceCouche } from '../../services/services-api/service-couche';
import { MatTable } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit{

  constructor(
    private serviceCouche: ServiceCouche
  ){}

  public laCoucheDesPoints!: Observable<any>;


  ngOnInit(): void {

  this.laCoucheDesPoints = this.serviceCouche.recupereLaCouchePointAndDescription();


}

  



}
