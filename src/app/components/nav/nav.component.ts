import { Component, OnInit } from '@angular/core';

@Component( {
  selector: 'app-nav',
  template: `
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <!-- Main Navigation -->
      <a class="navbar-brand font-weight-bold text-uppercase text-center"
         href="/">Fitness Tracker
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#main-navigation" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="main-navigation">
        <div class="navbar-nav mr-auto">
          <a class="nav-item nav-link" routerLink=""
             routerLinkActive="active">Home</a>
        </div>
        <div class="navbar-nav">
          <a class="nav-item nav-link pr-0" routerLink="/register"
             routerLinkActive="active">Register</a>
          <a class="nav-item nav-link pr-0" routerLink="/login"
             routerLinkActive="active">Login</a>
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
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
