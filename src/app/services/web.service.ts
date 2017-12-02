import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from '../models/workouts';

@Injectable()
export class WebService {

  private workoutsUrl = 'http://192.168.0.18:3000/api';

  constructor( private http: HttpClient ) {
    this.getWorkouts();
  }

  getWorkouts( workout?: string ) {
    workout = (workout) ? '/' + workout : '';
    return this.http.get<Workout[]>( this.workoutsUrl + '/workouts' + workout ).toPromise();
  }

  postWorkouts( workout: Workout ) {
    return this.http.post<Workout[]>( this.workoutsUrl + '/workouts', workout).toPromise();
  }
}


