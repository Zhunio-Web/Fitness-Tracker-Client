import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserLogin, UserRegistration } from '../models/users';
import { Logger } from './logger';
import { MatSnackBar } from '@angular/material';
import { JwtHelper } from 'angular2-jwt';
import { TrainerStoreService } from './trainer-store.service';

@Injectable()
export class AuthService {

  private AUTH_URL = 'http://192.168.0.18:3000/auth';
  private readonly NAME_KEY = 'name';
  private readonly TOKEN_KEY = 'token';

  private jwtHelper = new JwtHelper();
  private lg = new Logger();

  constructor( private http: HttpClient, private router: Router,
               private sb: MatSnackBar, private ts: TrainerStoreService ) {}

  get name() {
    return localStorage.getItem( this.NAME_KEY );
  }

  get userId() {
    let token = this.getTokenKey();
    return (token) ? this.jwtHelper.decodeToken( token ).user : token;
  }

  get isAuthenticated() {
    return !!this.getTokenKey();
  }

  get isTrainer() {
    let token = this.getTokenKey();
    return (token) ? this.ts.isTrainer( this.jwtHelper.decodeToken( token ).user ) : false;
  }

  get tokenHeader() {
    const header = new HttpHeaders( { Authorization: 'Bearer ' + this.getTokenKey() } );
    return { headers: header };
  }

  login( user: UserLogin ) {
    this.http.post<AuthResponse>( this.AUTH_URL + '/login', { user: user } ).subscribe(
      user => this.authenticateUser( user ),
      err => this.lg.logErrorMessage( err, this.sb )
    );
  }

  register( user: UserRegistration ) {
    /* Delete confirmPassword property because the server side does not need it */
    delete user.confirmPassword;

    /*
     * POST: /auth/register
     * body: {user}
     */
    this.http.post<AuthResponse>( this.AUTH_URL + '/register', user ).subscribe(
      res => this.authenticateUser( res )
    );
  }

  logout() {

    /* Remove user credentials */
    localStorage.removeItem( this.NAME_KEY );
    localStorage.removeItem( this.TOKEN_KEY );
    this.router.navigate( ['/login'] );
  }

  private authenticateUser( res: AuthResponse ) {
    /* Make sure token exists */
    if ( !res.token ) return;

    /* Set user credentials */
    localStorage.setItem( this.NAME_KEY, res.name );
    localStorage.setItem( this.TOKEN_KEY, res.token );

    /* Redirect to the home page */
    this.navigateHome();
  }

  private getTokenKey() {
    return localStorage.getItem( this.TOKEN_KEY );
  }

  private navigateHome() {
    this.router.navigate( ['/'] );
  }
}

interface AuthResponse {
  name: string;
  token: string;
}
