import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { NewWorkoutDetailComponent } from './components/new-workout-detail/new-workout-detail';
import { RegisterComponent } from './components/register/register.component';
import { WorkoutDetailComponent } from './components/workout-detail/workout-detail.component';
import { NewExerciseDetailComponent } from './components/new-exercise-detail/new-exercise-detail.component';

import { AuthGuardService } from './services/auth-guard.service';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { UserComponent } from './components/user/user.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/trainers' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'me', component: UserComponent },
  {
    path: 'trainers',
    component: TrainersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'workouts/:name/:trainerId',
    canActivate: [AuthGuardService],
    component: WorkoutsComponent,
    pathMatch: 'full'
  },
  {
    path: 'workouts/detail/:name/:workoutUrl/:trainerId',
    canActivate: [AuthGuardService],
    component: WorkoutDetailComponent,
    pathMatch: 'full',
  },

  { path: 'new-workout-detail', component: NewWorkoutDetailComponent },
  { path: 'new-exercise-detail', component: NewExerciseDetailComponent },

  { path: '**', redirectTo: '' }
];

@NgModule( {
  imports: [
    RouterModule.forRoot( appRoutes )
  ],
  exports: [RouterModule]
} )


export class AppRoutingModule {}
