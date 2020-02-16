import { NgModule } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule} from '@ng-select/ng-select';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { ModalModule } from 'ngx-bootstrap';
import {DataTablesModule} from 'angular-datatables';

import { ItemCategoryRoutingModule } from './item-category-routing.module';
import { ItemCategoryListComponent } from './item-category-list/item-category-list.component';

@NgModule({
  declarations: [ItemCategoryListComponent],
  imports: [
    CommonModule,
    ItemCategoryRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    FontAwesomeModule,
    ModalModule
  ]
})
export class ItemCategoryModule { }
