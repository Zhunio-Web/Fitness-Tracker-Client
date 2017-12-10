import { ITrainer } from './trainers';

const WORKOUTS = '/workouts';
const WORKOUT_DETAIL = '/workouts/detail';

export class Url {

  // return '/workouts/firstName-lastName/id'
  static workoutsByTrainer( trainer: ITrainer ) {
    return WORKOUTS + getTrainerUrl( trainer ) + '/' + trainer.id;
  }

  // return '/workouts/detail/firstName-lastName/workoutName'
  static workoutDetailByTrainer( trainer: ITrainer, workoutName: string ) {
    return WORKOUT_DETAIL + getTrainerUrl( trainer ) + getWorkoutUrl( workoutName )
      + '/' + trainer.id;
  }
}

// return '/firstName-lastName'
export function getTrainerUrl( trainer: ITrainer ) {
  return '/' + trainer.firstName.toLowerCase() + '-' + trainer.lastName.toLowerCase();
}

// return '/leg-press'
export function getWorkoutUrl( workoutName: string ) {
  return '/' + workoutName.toLowerCase().split( ' ' ).join( '-' );
}
