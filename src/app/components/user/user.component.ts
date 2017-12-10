import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebService } from '../../services/web.service';
import { IUser } from '../../models/users';

@Component( {
  selector: 'app-user',
  templateUrl: 'user.component.html'
} )
export class UserComponent implements OnInit {
  form: FormGroup;
  user: IUser;

  constructor( private fb: FormBuilder, private webService: WebService ) {}

  ngOnInit() {
    this.webService.getUser().subscribe( user => {
      console.log( user.isTrainer );
      this.user = user;
      this.form = this.fb.group( {
        firstName: [this.user.firstName, Validators.required],
        lastName: [this.user.lastName, Validators.required],
        isTrainer: [this.user.isTrainer, Validators.required]
      } );
    } );

  }

  onSubmit() {
    this.webService.saveUser( this.user, this.user.isTrainer );
  }

  isValid( control ) {
    return !this.form.controls[control].invalid;
  }

  isInvalid( control ) {
    return !this.isValid( control ) && this.form.controls[control].touched;
  }
}
