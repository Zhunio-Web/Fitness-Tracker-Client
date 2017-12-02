import { Component, EventEmitter, Output } from '@angular/core';
import { Exercise } from '../../models/workouts';

@Component( {
  selector: 'app-new-exercise-detail',
  templateUrl: './new-exercise-detail.component.html'
} )
export class NewExerciseDetailComponent {

  isYoutubeCheckboxChecked: boolean = false;
  @Output() onNewExercise = new EventEmitter();

  exercise: Exercise;

  constructor() {
    this.reset();
  }

  toggleCheckbox( youtubeCheckbox ) {
    this.isYoutubeCheckboxChecked = youtubeCheckbox.checked;
  }

  addNewExercise(youtubeCheckbox) {
    this.exercise.embed = this.isYoutubeCheckboxChecked ? this.getYoutubeEmbedUrl() : '';
    this.onNewExercise.emit( copyOf( this.exercise ) );
    youtubeCheckbox.cheked = false;
    this.reset();
  }

  private getYoutubeEmbedUrl() {
    return this.exercise.embed.split( '/' ).pop().split( '?' ).pop().split( '=' ).pop();
  }

  private reset() {
    this.exercise = {
      name: '',
      embed: '',
      sets: '4',
      reps: '8-12'
    };
  }
}

function copyOf( exercise: Exercise ): Exercise {
  return {
    name: exercise.name,
    embed: exercise.embed,
    sets: exercise.sets,
    reps: exercise.reps
  };
}
