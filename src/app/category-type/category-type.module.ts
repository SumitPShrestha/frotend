import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryTypeRoutingModule } from './category-type-routing.module';
import { CategoryTypeListComponent } from './category-type-list/category-type-list.component';
import { MatTableModule } from '@angular/material/table';
import {ReactiveFormsModule} from "@angular/forms";
import { CategoryTypeCreateComponent } from './category-type-create/category-type-create.component';
import { CategoryTypeEditComponent } from './category-type-edit/category-type-edit.component';
import {DataTablesModule} from "angular-datatables";



@NgModule({
  declarations: [CategoryTypeListComponent, CategoryTypeCreateComponent, CategoryTypeEditComponent],
  imports: [
    CommonModule,
    CategoryTypeRoutingModule,
    DataTablesModule,
    FontAwesomeModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    CategoryTypeCreateComponent, CategoryTypeEditComponent
  ]
})
export class CategoryTypeModule { }
