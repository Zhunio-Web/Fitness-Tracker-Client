import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewWorkoutDetailComponent } from './components/new-workout-detail/new-workout-detail';
import { RegisterComponent } from './components/register/register.component';
import { WorkoutDetailComponent } from './components/workout-detail/workout-detail.component';
import { NewExerciseDetailComponent } from './components/new-exercise-detail/new-exercise-detail.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'new-workout-detail', component: NewWorkoutDetailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'workout-detail/:name', component: WorkoutDetailComponent },
  { path: 'new-exercise-detail', component: NewExerciseDetailComponent }

];

@NgModule( {
  imports: [
    RouterModule.forRoot( appRoutes )
  ],
  exports: [RouterModule]
} )


export class AppRoutingModule {}
