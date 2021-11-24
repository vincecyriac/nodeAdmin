import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from '../common/guards/no-auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component : LoginComponent, pathMatch : 'full', canActivate: [NoAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
