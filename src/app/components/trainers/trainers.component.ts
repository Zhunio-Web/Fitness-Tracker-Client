import { Component, OnInit } from '@angular/core';
import { WebService } from '../../services/web.service';
import { ITrainer } from '../../models/trainers';
import { Router } from '@angular/router';
import { Url } from '../../models/urls';

@Component( {
  selector: 'app-trainers',
  template: `
    <div class="row justify-content-center" *ngFor="let trainer of webService.trainers | async">
      <div class="col-sm-10 col-md-8">

        <div class="card" (click)="toWorkoutsBy(trainer)">
          <img class="card-img-top" src="/assets/img/workouts-bg.png"
               alt="{{trainer.firstName}}">
          <div>
            <h1>{{trainer.firstName}} {{trainer.lastName}}</h1>
          </div>
        </div>

      </div>
    </div>
  `,
  styleUrls: ['trainers.component.scss']
} )
export class TrainersComponent implements OnInit {

  constructor( public webService: WebService, private router: Router ) {}

  ngOnInit() {
    this.webService.getTrainers();
  }

  toWorkoutsBy( trainer: ITrainer ) {
    this.router.navigate( [Url.workoutsByTrainer( trainer )] );
  }
}
