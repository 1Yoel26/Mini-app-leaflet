import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserConnectionCompte } from '../../interfaces/user-connection-compte';
import { ServiceUser } from '../../services/services-api/service-user';


@Component({
  selector: 'app-authentification',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './authentification.html',
  styleUrl: './authentification.scss'
  
})
export class Authentification implements OnInit {

  constructor(
    private serviceUser: ServiceUser
  ){}

  public formGroup!: FormGroup;


  ngOnInit(): void {

    this.formGroup = new FormGroup({
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
          Validators.minLength(2)
        ]
      )
    });
    
  }



  connectionCompte(){

    // Tentative de connection au compte si le formulaire est valide:

    if(this.formGroup.valid){

      let infoConnectionCompe: UserConnectionCompte;
      infoConnectionCompe = this.formGroup.value;

      // appel Http vers le backend
      this.serviceUser.authentificationCompte(infoConnectionCompe).subscribe(
        (authentificationValider: Boolean) =>{

          // si l'appel Http retourne true (cela signifie que la connection à réussi:)
          if(authentificationValider){

            alert("Authentification réussi ! ");

          }
          else{

             alert("Dsl authentification échoué");

          }
        }
      );
      

    }


  }
  

}
