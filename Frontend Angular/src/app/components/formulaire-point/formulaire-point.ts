import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PointAndDescriptionDto } from '../../interfaces/point-and-description-dto';
import { ServiceLeaflet } from '../../services/services-metier/service-leaflet';
import { ServiceCouche } from '../../services/services-api/service-couche';
import { ServicePointsStorage } from '../../services/services-stockage/service-points-storage';
import { ServiceEventSubject } from '../../services/services-event/service-event-subject';
import { NewPointAdd } from '../../interfaces/new-point-add';
import { MatDialogRef } from '@angular/material/dialog';


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
    private servicePointsStorage: ServicePointsStorage,
    private serviceEventSubject: ServiceEventSubject,
    private matDialogReference: MatDialogRef<FormulairePoint>
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
        
        // envois d'un subject au map.ts pour lui dire d'appeler la fonction 6 
        // avec le nouveau point ajouté récupérer du storage : 

        const newPointAdd: NewPointAdd = {
          coordonneLatitude: this.servicePointsStorage.getPoints().latitude,
          coordonneLongitude: this.servicePointsStorage.getPoints().longitude
        }

        this.serviceEventSubject.notifAddNewPoint(newPointAdd);

        // fermeture de la popup si l'insertion 
        // du Point + sa description en Bdd à réussi
        this.matDialogReference.close();
        

      },

      // en cas de retour avec erreur du backend
      error:()=> {
        alert("Une erreur s'est produite lors de l'envois de votre description. Merci de ré-essayer ultérieurement.");
      }
    });

    return true;
  }


}
