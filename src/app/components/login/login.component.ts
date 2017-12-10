import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../models/users';

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
} )
export class LoginComponent {

  user: UserLogin = { email: '', password: '' };

  constructor(private auth: AuthService) { }

  login() {
    this.auth.login(this.user);
  }

}
