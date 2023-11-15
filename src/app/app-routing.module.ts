import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {UserDetailComponent} from "./components/user-detail/user-detail.component";
import {UserListComponent} from "./components/user-list/user-list.component";

const routes: Routes = [
  { path : '', component : HomeComponent },
  { path : 'inscription', component : RegisterComponent },
  { path : 'connexion', component : LoginComponent },
  { path : 'utilisateur', component : UserDetailComponent },
  { path : 'utilisateur/liste', component : UserListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
