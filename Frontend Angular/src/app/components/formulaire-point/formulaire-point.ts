import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-formulaire-point',
  imports: [ReactiveFormsModule],
  templateUrl: './formulaire-point.html',
  styleUrl: './formulaire-point.scss',
})
export class FormulairePoint implements OnInit{

  public formulaireGroupePoint!: FormGroup;



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

    

    return true;
  }




}
