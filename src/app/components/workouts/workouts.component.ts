import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebService } from '../../services/web.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Url } from '../../models/urls';
import 'rxjs/add/operator/map';
import { ITrainer } from '../../models/trainers';
import { ISubscription } from 'rxjs/Subscription';
import { TrainerStoreService } from '../../services/trainer-store.service';

@Component( {
  selector: 'app-workouts',
  template: `
    <div *ngIf="trainer">
      <div class="row justify-content-center">
        <div class="col-6 col-md-4" style="margin-bottom: 15px"
             *ngFor="let workout of trainer.workouts">

          <div class="card" style="cursor: pointer; height: 175px;" (click)="toWorkoutDetail(workout.name)">
            <img class="card-img-top" [src]="workout.picture" style="overflow: hidden; height: 100%"
                 alt="{{workout.name}}">
            <div class="card-body p-2 text-center">
              <h4 class="card-title mb-0">{{workout.name}}</h4>
            </div>
          </div>

        </div>
      </div>
    </div>
  `
} )
export class WorkoutsComponent implements OnInit, OnDestroy {
  trainer: ITrainer;
  private subscription: ISubscription;

  constructor( public webService: WebService, private route: ActivatedRoute,
               private router: Router, private ts: TrainerStoreService ) {}

  ngOnInit() {
    this.webService.getWorkouts( this.route.snapshot.params.trainerId );
    this.subscription = this.webService.trainers.subscribe(
      ( trainer: ITrainer ) => this.trainer = trainer );
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toWorkoutDetail( workoutName: string ) {
    this.router.navigate( [Url.workoutDetailByTrainer( this.trainer, workoutName )] );
  }
}
