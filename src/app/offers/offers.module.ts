import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffersListComponent } from './offers-list/offers-list.component';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DataTablesModule} from 'angular-datatables';
import { OffersCreateComponent } from './offers-create/offers-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import { OffersEditComponent } from './offers-edit/offers-edit.component';

@NgModule({
  declarations: [OffersListComponent, OffersCreateComponent, OffersEditComponent],
  imports: [
    CommonModule,
    OffersRoutingModule,
    FontAwesomeModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  entryComponents: [
    OffersCreateComponent, OffersEditComponent
  ]
})
export class OffersModule { }
