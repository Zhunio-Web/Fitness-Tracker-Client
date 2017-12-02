import { Component, OnInit } from '@angular/core';
import { WebService } from '../../services/web.service';
import { Router } from '@angular/router';
import { Workout } from '../../models/workouts';

@Component( {
  selector: 'app-workouts',
  template: `
    <div class="row">
      <div class="col-6 col-md-4" style="margin-bottom: 15px"
           *ngFor="let workout of workouts">

        <div class="card" style="cursor: pointer;" (click)="navigateTo(workout.name)">
          <img class="card-img-top" [src]="workout.picture"
               alt="{{workout.name}}">
          <div class="card-body p-2 text-center">
            <h4 class="card-title mb-0">{{workout.name}}</h4>
          </div>
        </div>

      </div>
    </div>
  `
} )
export class WorkoutsComponent implements OnInit {
  workouts: Workout[] = [];

  constructor( public webService: WebService, private router: Router ) {}

  async ngOnInit() {
    let res = await this.webService.getWorkouts();
    this.workouts = res;
  }

  navigateTo( workoutName: string ) {
    this.router.navigate( ['/workout-detail/' + this.getWorkoutUrl( workoutName )] );
  }

  private getWorkoutUrl( workoutName ) {
    return workoutName.toLowerCase().split( ' ' ).join( '-' );
  }
}
