import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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

      password: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      )
    });
    
  }
  

}
