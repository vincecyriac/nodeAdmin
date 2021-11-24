import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/common/guards/auth.guard';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component : ListComponent, pathMatch : 'full',canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
