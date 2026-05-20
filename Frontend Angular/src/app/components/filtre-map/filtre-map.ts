import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceCouche } from '../../services/services-api/service-couche';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ServiceEventFiltre } from '../../services/services-event/service-event-filtre';

@Component({
  selector: 'app-filtre-map',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './filtre-map.html',
  styleUrl: './filtre-map.scss',
})
export class FiltreMap implements OnInit, AfterViewInit {


  // récupération du inputRecherche pour mettre ensuite le autofocus dessus, même
  // avec la navigation entre les pages (sans rechargement complet de la page):
  @ViewChild('inputRechercheFocus')
  private inputRechercheFocus!: ElementRef;

  public formGroupFiltre!: FormGroup;

  public aucunResultatTrouver: string = "Aucun point n'a été trouvé pour cette description.";

  public booleenAucunResultatTrouver: boolean = false;

  // récupération du texte à chercher
  private valeurTexteAChercher!: string;


  constructor(
    private serviceCouche: ServiceCouche,
    private serviceEventFiltre: ServiceEventFiltre
  ){}



  ngOnInit(): void {


    this.formGroupFiltre = new FormGroup({

      // ce formulaire de filtre n'a pas de Validator car ce n'est pas utile.
      description: new FormControl('')
    });


    

    // détection si le formulaire de recherche change, lancer automatiquement la recherche 
    // à chaque changement de valeur, sans avoir besoin de cliquer sur le bouton Rechercher:
    
    // si le formulaire n'est pas vide, detecte automatiquement les changement:
  

    this.formGroupFiltre.get("description")!.valueChanges.subscribe(

      (texteAChercher: string)=>{

      // récupération de la valeur du input description:
      this.valeurTexteAChercher = texteAChercher;

      this.filtrer(this.valeurTexteAChercher);

      }

  );

  }



  // Mettre autofocus sur le inputRecherche, une fois que le DOM Html est bien chargé:
  ngAfterViewInit(): void {

    this.inputRechercheFocus.nativeElement.focus();

  }


  // fonction pour lancer la recherche du texte saisit dans la couche des points:
  filtrer(texteAChercher: string){

    // envois du mot à rechercher au map.ts via un next():
    // puis le map.ts appel le service-leaflet.ts avec ce mot en argument.
    // puis le map.ts affiche la couche filtré sur la carte (via le service-leaflet là aussi):

    this.serviceEventFiltre.next(texteAChercher);

  }

  

  

  
  
}
