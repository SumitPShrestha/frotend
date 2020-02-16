import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import {UserEditComponent} from './user-edit/user-edit.component';

const routes: Routes = [
  {
    path: 'create',
    component: UserCreateComponent
  },
  {
    path: 'edit',
    component: UserEditComponent
  },
  {
    path: 'all',
    component: UserListComponent
  },
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
