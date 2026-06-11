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
        (jwtRetourner: string) =>{

          // si l'appel Http retourne une string avec 3 points, (cela signifie que la connection à réussi car la structure d'un jwt est : "header.payload.signature" )
          if(jwtRetourner.split(".").length == 3){

            alert("Bravo ! Authentification réussi! \n" + jwtRetourner);

            // stockage du tokenJwt dans le localstorage pour pouvoir le récupérer par la suite dans le interceptor.ts
            localStorage.setItem("tokenJwt:", jwtRetourner);

          }

          // si l'appel Http retourne une string Null jwt token (cela signifie que la connection à échoué)
          else{
             
            alert("Dsl authentification échoué");

          }
        }
      );
      

    }


  }
  

}
