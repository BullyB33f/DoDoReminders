import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';

const routes: Routes = [
  {path: 'login', title: 'LOGIN', component: LoginComponent},
  {path: 'register', title: 'REGISTER', component: RegisterComponent},
  {path: 'contact', title: 'CONTACT US', component: ContactComponent},
  {path: 'home', title: 'HOME', component: HomeComponent},
  {path: 'dashboard', title: 'Dashboard', component: DashboardComponent},
  {path: 'edit/:id', title: 'Edit Task', component: UpdateComponent},
  {path: 'delete/:id', title: 'Delete Task', component: DeleteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
