import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Exercise, Workout } from '../../models/workouts';
import { TrainerStoreService } from '../../services/trainer-store.service';
import { WebService } from '../../services/web.service';
import { ISubscription } from 'rxjs/Subscription';

@Component( {
  selector: 'app-workout-detail',
  templateUrl: 'workout-detail.component.html',
  styleUrls: ['workout-detail.component.scss']
} )
export class WorkoutDetailComponent implements OnInit, OnDestroy {

  workout: Workout;
  safeEmbed: SafeResourceUrl;
  subscription: ISubscription;
  currentExercise;

  constructor( private ts: TrainerStoreService, private route: ActivatedRoute,
               private sanitizer: DomSanitizer, private webService: WebService ) {}

  ngOnInit() {
    const workoutName = this.route.snapshot.params.workoutUrl;
    const trainerId = this.route.snapshot.params.trainerId;

    if ( this.ts.isEmpty ) {
      this.webService.getWorkouts( trainerId );
      this.subscription = this.webService.trainers.subscribe( _ => {
        this.workout = this.ts.getWorkout( trainerId, workoutName );
      } );
    }
    else
      this.workout = this.ts.getWorkout( trainerId, workoutName );
  }

  ngOnDestroy() {
    if ( this.subscription )
      this.subscription.unsubscribe();
  }

  isExecise( exercise ) {
    return this.currentExercise === exercise;
  }

  loadVideo( exercise: Exercise ) {
    this.currentExercise = exercise;
    this.safeEmbed = this.getVideoUrl(exercise.embed);
  }

  getVideoUrl(embed) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + embed );
  }

  videoExists() {
    return !!this.safeEmbed;
  }

  pictureExists() {
    return !this.videoExists() && !!this.workout.picture;
  }
}
