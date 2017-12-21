import { Component, OnInit, ViewChild } from '@angular/core';
import { Exercise, Workout } from '../../models/workouts';
import { NewExercisesComponent } from '../new-exercise/new-exercise.component';
import { WebService } from '../../services/web.service';
import { AuthService } from '../../services/auth.service';

@Component( {
  selector: 'app-new-workout-detail',
  templateUrl: './new-workout-detail.html'
} )
export class NewWorkoutDetailComponent implements OnInit {

  @ViewChild( NewExercisesComponent ) newExercises: NewExercisesComponent;

  newWorkout: Workout;
  recommendedWorkouts: Workout[];

  defaultImage = 'https://d2z0k43lzfi12d.cloudfront.net/blog/vcdn176/wp-content/uploads/2017/06/09.06._Things-you-should-never-do-after-a-workout-1.jpg';

  constructor( private webService: WebService, private auth: AuthService ) { }

  ngOnInit() {
    this.reset();
  }

  postWorkout() {
    if ( !this.newWorkout.picture )
      this.newWorkout.picture = this.defaultImage;

    this.webService.postWorkouts( this.newWorkout );
    this.reset();
  }
  
  searchWorkouts() {
    this.webService.postRecommendedWorkouts(this.newWorkout).subscribe(res => {
      this.recommendedWorkouts = res;
      if (!this.newWorkout.name) this.recommendedWorkouts = [];
    });
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
