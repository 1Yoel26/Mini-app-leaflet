import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PointAndDescriptionDto } from '../../interfaces/point-and-description-dto';
import { ServiceLeaflet } from '../../services/service-leaflet';
import { ServiceCouche } from '../../services/service-couche';
import { ServicePointsStorage } from '../../services/service-points-storage';


@Component({
  selector: 'app-formulaire-point',
  imports: [ReactiveFormsModule],
  templateUrl: './formulaire-point.html',
  styleUrl: './formulaire-point.scss',
})
export class FormulairePoint implements OnInit{

  public formulaireGroupePoint!: FormGroup;

  private infoPointAndDescriptionDto!: PointAndDescriptionDto;

  constructor(
    private serviceCouche: ServiceCouche,
    private servicePointsStorage: ServicePointsStorage
  ){}

  ngOnInit(): void {

    // initialisation du formulaire global
    this.formulaireGroupePoint = new FormGroup({

      // création des champs input dans le formulaire: FormControl('Valeur de départ' | Validation du form | Options en plus comme non null obligatoire)
      commentaireSurLaZonneSaisit: new FormControl(
        '',
        [ 
          Validators.required,
          Validators.minLength(3)
        ]
      ) 
    });
    
  }



  // fonction pour envoyer le formulaire
  envoyerFormulaire(): boolean{

    // si le formulaire envoyé n'est pas valide:
    if(this.formulaireGroupePoint.invalid){
      return false;
    }


    // si le formulaire est valide:

    // avant d'envoyer le formulaire en Bdd : 
    // - récupération des coordonnées du point cliqué par l'utilisateur via le servicePointsStorage:
    // - et récupération du champs description saisis dessus :


    // instanciation de l'objet infoPointAndDescriptionDto avec les infos du point et de la description :
    this.infoPointAndDescriptionDto = {

      coordonneeLongitude : this.servicePointsStorage.getPoints().longitude,
      coordonneeLatitude : this.servicePointsStorage.getPoints().latitude,
      description : this.formulaireGroupePoint.get("commentaireSurLaZonneSaisit")?.value

    };
    

    

    // puis appel du service qui va envoyer le point + la description au backend :
    this.serviceCouche.enregistrementFormulaireEnBdd(this.infoPointAndDescriptionDto).subscribe({
      // en cas de retour réussi du backend
      next:() => {
        alert("Insertion réussi en Bdd " + this.infoPointAndDescriptionDto.coordonneeLatitude +" "+ this.infoPointAndDescriptionDto.coordonneeLongitude);
      },

      // en cas de retour avec erreur du backend
      error:()=> {
        alert("Insertion en Bdd echoué");
      }
    });

    return true;
  }


}
