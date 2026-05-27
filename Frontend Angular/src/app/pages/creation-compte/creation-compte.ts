import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { UserCreationCompte } from '../../interfaces/user-creation-compte';
import { ServiceUser } from '../../services/services-api/service-user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creation-compte',
  imports: [
    MatCard, 
    MatCardTitle, 
    ReactiveFormsModule, 
    MatInputModule,
    MatFormField, 
    MatLabel, 
    MatError,
    MatButtonModule
  ],
  templateUrl: './creation-compte.html',
  styleUrl: './creation-compte.scss',
})
export class CreationCompte implements OnInit {

   public formGroup!: FormGroup;

   constructor(
    private serviceUser: ServiceUser,
    private matSnackBar: MatSnackBar
  ){}


  ngOnInit(): void {

    this.formGroup = new FormGroup({

      nom: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ),

      prenom: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ),

      email: new FormControl(
        '', 
        [
          Validators.required,
          Validators.email
        ]
      ),

      motDePasse: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      )
    });
    
  }


  addNewCompte(){

    if(this.formGroup.valid){

      let infoCompte: UserCreationCompte; 

      infoCompte = this.formGroup.value;

      let addNewUserReussi: Boolean;

      this.serviceUser.addNewCompte(infoCompte).subscribe(
        (booleanAddNewUserReussi: boolean)=>{
          addNewUserReussi = booleanAddNewUserReussi;

          // si la création du compte à réussi:
          if(addNewUserReussi == true){

            this.matSnackBar.open("✅ Votre compte à été créé avec succès!", "Fermer", {
              duration: 3000,
              verticalPosition: "top"
            });

          }else{

            this.matSnackBar.open("❌ Erreur lors de la création de votre compte, car cet email est déjà pris.", "Fermer", {
              duration: 15000,
              verticalPosition: "top"
            });

          }


          // si la création du compte à échoué (car l'email est déjà pris):
        }
      );

      


    }

  }
  

}
