import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { UserCreationCompte } from '../../interfaces/user-creation-compte';

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

      alert(JSON.stringify(infoCompte));

    }

  }
  

}
