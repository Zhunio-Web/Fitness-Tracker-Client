export interface Workout {
  name: string;
  picture: string;
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  embed: string;
  sets: string;
  reps: string;
}
