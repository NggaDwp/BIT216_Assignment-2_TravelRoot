import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RateComponent } from './review/rate/rate.component';
import { ListComponent } from './review/list/list.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' }, // Redirect to register on initial load
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent},
  { path: 'rate/:id', component:RateComponent},
  { path: 'review', component:ListComponent},
  // ... other routes if any
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
