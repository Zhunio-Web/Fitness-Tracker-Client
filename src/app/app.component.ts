import { Component } from '@angular/core';

@Component( {
  selector: 'app-root',
  template: `
    <app-nav></app-nav>
    <!-- Main Content -->
    <main class="container-fluid">
      <router-outlet></router-outlet>
    </main>
  `
} )
export class AppComponent {}
