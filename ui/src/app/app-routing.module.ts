import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guard';
import { NoAuthGuard } from './common/guards/no-auth.guard';

const routes: Routes = [
  { path: '', redirectTo : 'login', pathMatch : 'full' },
  { path: 'login', loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule), canActivate: [NoAuthGuard] },
  { path: 'dashboard', loadChildren: ()=> import('./features/features.module').then(m => m.FeaturesModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo : 'login', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
