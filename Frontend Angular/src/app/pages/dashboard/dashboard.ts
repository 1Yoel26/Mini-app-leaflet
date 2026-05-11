import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ServiceCouche } from '../../services/services-api/service-couche';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit{

  constructor(
    private serviceCouche: ServiceCouche
  ){}

  public laCoucheDesPoints!: any[];


  ngOnInit(): void {

    this.serviceCouche.recupereLaCouchePointAndDescription().subscribe(
      (coucheDesPoints)=>{
        this.laCoucheDesPoints = coucheDesPoints;
      }
    );
    
  }

  



}
