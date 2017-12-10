import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

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
import { TrainersComponent } from './components/trainers/trainers.component';

import { WebService } from './services/web.service';
import { AuthService } from './services/auth.service';

import { AppRoutingModule } from './app.routes';
import { AuthGuardService } from './services/auth-guard.service';
import { TrainerStoreService } from './services/trainer-store.service';
import { UserComponent } from './components/user/user.component';

@NgModule( {
  declarations: [
    AppComponent, NavComponent, HomeComponent, LoginComponent, RegisterComponent,
    WorkoutsComponent, WorkoutDetailComponent, NewWorkoutDetailComponent,
    NewExerciseDetailComponent, NewExercisesComponent, TrainersComponent, UserComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatSnackBarModule, AppRoutingModule,
    HttpClientModule, RouterModule, FormsModule, ReactiveFormsModule

  ],
  providers: [AuthService, WebService, FormBuilder, AuthGuardService, TrainerStoreService],
  bootstrap: [AppComponent]
} )
export class AppModule {}
