import { Workout } from './workouts';

export interface ITrainer {
  firstName: string;
  lastName: string;
  id: number;
  workouts: Workout[];
}
