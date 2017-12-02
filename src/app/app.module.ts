import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WorkoutDetailComponent } from './components/workout-detail/workout-detail.component';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { NewWorkoutDetailComponent } from './components/new-workout-detail/new-workout-detail';
import { NewExerciseDetailComponent } from './components/new-exercise-detail/new-exercise-detail.component';
import { NewExercisesComponent } from './components/new-exercise/new-exercise.component';

import { WebService } from './services/web.service';

import { AppRoutingModule } from './app.routes';

@NgModule( {
  declarations: [
    AppComponent, NavComponent, HomeComponent, LoginComponent, RegisterComponent,
    WorkoutsComponent, WorkoutDetailComponent, NewWorkoutDetailComponent,
    NewExerciseDetailComponent, NewExercisesComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, RouterModule, FormsModule
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
} )
export class AppModule {}
