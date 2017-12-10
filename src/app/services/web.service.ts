import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from '../models/workouts';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';
import { Logger } from './logger';
import { AuthService } from './auth.service';
import { ITrainer } from '../models/trainers';
import { TrainerStoreService } from './trainer-store.service';
import { IUser } from '../models/users';
import { Observable } from 'rxjs/Observable';

const BASE_URL = 'http://192.168.0.18:3000/api';

@Injectable()
export class WebService {

  private trainerSubject = new Subject();
  trainers = this.trainerSubject.asObservable();
  private lg = new Logger();

  constructor( private http: HttpClient, private sb: MatSnackBar,
               private auth: AuthService, private ts: TrainerStoreService ) {}

  getUser() {
    const url = BASE_URL + '/users/me';
    return this.get<IUser>( url );
  }

  saveUser( user: IUser, isTrainer?: boolean ) {
    isTrainer = (isTrainer);

    const url = BASE_URL + '/users/me';
    this.post( url, { user: user, isTrainer: isTrainer } ).subscribe(
      response => this.successResponse( response ),
      err => this.errorHandler( err )
    );
  }

  getTrainers() {
    const url = BASE_URL + '/trainers';

    this.get<ITrainer[]>( url ).subscribe( trainers => {
        this.ts.trainerStore = trainers;
        this.trainerSubject.next( this.ts.trainerStore );
      }, err => this.errorHandler( err )
    );
  }

  getWorkouts( trainerId: string ) {
    const url = BASE_URL + '/trainers/workouts';

    this.get<ITrainer>( url + '/' + trainerId )
      .subscribe( trainer => {
          this.ts.add( trainer );
          this.trainerSubject.next( trainer );
        },
        err => this.errorHandler( err )
      );
  }

  postWorkouts( workout: Workout ) {
    const url = BASE_URL + '/workouts';
    this.post( url, { workout: workout } ).subscribe(
      response => this.successResponse( response ),
      err => this.errorHandler( err )
    );
  }

  private successResponse( response: ServerResponse ) {
    console.log( response );
    this.sb.open( response.message, 'close', {
      duration: 5000,
      panelClass: 'server-response-success'
    } );
  }

  private get<T>( url ): Observable<T> {
    return this.http.get<T>( url, this.auth.tokenHeader );

  }

  private post( url, data ): Observable<ServerResponse> {
    return this.http.post<ServerResponse>( url, data, this.auth.tokenHeader );
  }

  errorHandler( err ) {
    this.lg.logErrorMessage( err, this.sb );
  }
}

interface ServerResponse {
  success: boolean;
  message: string;
}

