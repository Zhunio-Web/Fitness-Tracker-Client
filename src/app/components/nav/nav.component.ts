import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { WebService } from '../../services/web.service';

@Component( {
  selector: 'app-nav',
  template: `
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <!-- Main Navigation -->
      <a class="navbar-brand font-weight-bold text-uppercase text-center"
         routerLink="">Fitness Tracker
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#main-navigation" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="main-navigation">
        <div class="navbar-nav mr-auto">
          <a class="nav-item nav-link" routerLink="" routerLinkActive="active">Home</a>
          <a *ngIf="auth.isTrainer" class="nav-item nav-link" routerLink="/workouts/new" 
             routerLinkActive="active">Workouts</a>
        </div>
        <div class="navbar-nav">
          <a *ngIf="!auth.isAuthenticated" class="nav-item nav-link pr-0" routerLink="/login"
             routerLinkActive="active">Login/Register</a>
          <a *ngIf="auth.isAuthenticated" class="nav-item nav-link pr-0" routerLink="/me"
             routerLinkActive="active">Welcome {{auth.name}}</a>
          <a *ngIf="auth.isAuthenticated" class="nav-item nav-link pr-0" routerLink="/logout"
             routerLinkActive="active" (click)="auth.logout()">Logout</a>
        </div>
      </div>
    </nav>
  `,
  styles: [
      `
      nav {
        margin-bottom: 15px;
      }
      `
  ]
} )
export class NavComponent {
  constructor( public auth: AuthService, public webService: WebService ) { }
}
