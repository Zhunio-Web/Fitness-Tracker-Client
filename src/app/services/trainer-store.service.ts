import { Injectable } from '@angular/core';
import { ITrainer } from '../models/trainers';
import { Workout } from '../models/workouts';

@Injectable()
export class TrainerStoreService {
  private _trainerStore: ITrainer[] = [];

  constructor() {}

  get trainerStore() {
    return this._trainerStore;
  }

  set trainerStore( trainerStore: ITrainer[] ) {
    this._trainerStore = trainerStore;
  }

  get isEmpty() {
    return this._trainerStore.length === 0;
  }

  add( trainer: ITrainer ) {
    const found = this.findTrainer( trainer.id );

    if ( found )
      found.workouts = trainer.workouts;
    else
      this._trainerStore.push( trainer );
  }

  isTrainer( trainerId: number ) {
    const found = this.findTrainer( trainerId );

    return !!found;
  }

  getWorkout( trainerId: string, workoutName: string ): Workout {
    const found = this.findTrainer( trainerId );

    if ( !found ) return undefined;

    return this.findWorkout( found, workoutName );
  }

  findWorkout( trainer: ITrainer, workoutUrl: string ) {
    const workout = trainer.workouts.find(
      x => x.name.toLowerCase().split( ' ' ).join( '-' ) === workoutUrl );
    return workout;
  }

  private findTrainer( trainerId: string | number ) {
    trainerId = typeof trainerId === 'string' ? parseInt( trainerId ) : trainerId;

    return this._trainerStore.find( x => x.id === trainerId );
  }

}

