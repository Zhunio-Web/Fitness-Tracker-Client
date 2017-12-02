import { Component } from '@angular/core';
import { Exercise } from '../../models/workouts';

@Component( {
  selector: 'app-new-exercises',
  template: `
    <div class="card border-secondary" *ngIf="!isEmpty()">
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex p-2 bg-light">
          <h6 class="m-0" style="width: 50%">Exercises</h6>
          <h6 class="m-0" style="width: 20%">Sets</h6>
          <h6 class="m-0" style="width: 20%">Reps</h6>
        </li>
      </ul>
      <ul class="list-group list-group-flush bg-light" style="font-size: 0.9em">
        <li class="list-group-item d-flex p-2 bg-light"
            *ngFor="let exercise of exercises; index as i">
          <p class="m-0" style="width: 50%">{{exercise.name}}</p>
          <p class="m-0" style="width: 20%">{{exercise.sets}}</p>
          <p class="m-0" style="width: 20%">{{exercise.reps}}</p>
          <button (click)="removeExercise(i)" class="btn btn-danger p-1">x</button>

        </li>
      </ul>
    </div>
  `
} )
export class NewExercisesComponent {

  exercises: Exercise[];

  constructor() {
    this.reset();
  }

  isEmpty() {
    return this.exercises.length <= 0;
  }

  removeExercise( index ) {
    this.exercises.splice( index, 1 );
  }

  addExercise( exercise: Exercise ) {
    this.exercises.push( exercise );
  }

  reset() {
    this.exercises = [];
  }
}
