import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersService } from './users.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { TextBoxComponent } from '../core/components/textbox/textbox.component';

@NgModule({
  declarations: [
    TextBoxComponent,

    UserCreateComponent,
    UserListComponent,
    UserEditComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgSelectModule,
    DataTablesModule
  ],
  providers: [UsersService]
})
export class UsersModule { }
