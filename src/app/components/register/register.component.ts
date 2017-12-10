import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component( {
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
} )
export class RegisterComponent {
  form;

  constructor( private fb: FormBuilder, private auth: AuthService ) {
    this.form = fb.group( {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, emailValid()]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: matchingFields( 'password', 'confirmPassword' ) } );
  }

  onSubmit() {
    this.auth.register( this.form.value );
  }

  isValid( control ) {
    return !this.form.controls[control].invalid;
  }

  isInvalid( control ) {
    return !this.isValid( control ) && this.form.controls[control].touched;
  }

}

function emailValid() {
  return control => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test( control.value ) ? null : { invalidEmail: true };
  };
}

function matchingFields( field1, field2 ) {
  return form => {
    if ( form.controls[field1].value !== form.controls[field2].value ) {
      return { mismatchedFields: true };
    }
  };
}
