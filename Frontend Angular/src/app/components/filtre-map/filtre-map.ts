import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceCouche } from '../../services/services-api/service-couche';

@Component({
  selector: 'app-filtre-map',
  imports: [],
  templateUrl: './filtre-map.html',
  styleUrl: './filtre-map.scss',
})
export class FiltreMap implements OnInit {

  private formGroupFiltre!: FormGroup;

  constructor(
    private serviceCouche: ServiceCouche
  ){}

  ngOnInit(): void {
    this.formGroupFiltre = new FormGroup({
      description: new FormControl('')
    });
  }

  filtrer(motAChercher: string){

    alert(motAChercher);

    this.serviceCouche.recupereLaCouchePointFiltreByDescription(motAChercher).subscribe(
      ()=>{
        console.log("Service de filtre back bien appelé")
      }
    );

  }

  

  

  
  
}
