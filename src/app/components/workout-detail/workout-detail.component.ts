import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../../services/web.service';
import { Workout } from '../../models/workouts';

@Component( {
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html'
} )
export class WorkoutDetailComponent implements OnInit {

  workout: Workout;
  embed: string = '';

  constructor( private webService: WebService, private route: ActivatedRoute,
               private sanitizer: DomSanitizer ) { }

  async ngOnInit() {
    let workoutName = this.route.snapshot.params.name;
    let res = await this.webService.getWorkouts( workoutName );
    this.workout = res[0];
  }

  loadVideo( embed ) {
    this.embed = embed;
  }

  getVideoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.embed );
  }

  videoExists() {
    return !!this.embed;
  }

  pictureExists() {
    return !this.videoExists() && !!this.workout.picture;
  }
}
