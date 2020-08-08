import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponet } from './signup/signup.component';

const routes : Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponet}
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
