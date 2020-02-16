import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { NgSelectModule} from '@ng-select/ng-select';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsCreateComponent } from './items-create/items-create.component';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { DataTablesModule} from 'angular-datatables';
import { ItemsEditComponent } from './items-edit/items-edit.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [ItemsListComponent, ItemsCreateComponent, ItemsEditComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgSelectModule,
    DataTablesModule,
    TooltipModule.forRoot(),
    ImageCropperModule
  ],
  entryComponents: [
    ItemsCreateComponent, ItemsEditComponent
  ]
})
export class ItemsModule { }
