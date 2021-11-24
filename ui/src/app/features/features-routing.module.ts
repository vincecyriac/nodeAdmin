import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../common/guards/auth.guard';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent,
    children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      { path: 'user', loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
