import { Component, OnInit, ViewChild } from '@angular/core';
import { Exercise, Workout } from '../../models/workouts';
import { NewExercisesComponent } from '../new-exercise/new-exercise.component';
import { WebService } from '../../services/web.service';

@Component( {
  selector: 'app-new-workout-detail',
  templateUrl: './new-workout-detail.html'
} )
export class NewWorkoutDetailComponent implements OnInit {

  @ViewChild( NewExercisesComponent ) newExercises: NewExercisesComponent;

  newWorkout: Workout;

  constructor( private webService: WebService ) { }

  ngOnInit() {
    this.reset();
  }

  postWorkout() {
    this.webService.postWorkouts( this.newWorkout );
    this.reset();
  }

  onNewExercise( newExercise: Exercise ) {
    this.newExercises.addExercise( newExercise );
  }

  private reset() {
    this.newExercises.reset();
    this.newWorkout = {
      name: '',
      picture: '',
      exercises: this.newExercises.exercises
    };
  }
}
