import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesListComponent } from './tables-list/tables-list.component';
import { DataTablesModule} from 'angular-datatables';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [TablesListComponent],
  imports: [
    CommonModule,
    TablesRoutingModule,
    DataTablesModule,
    FontAwesomeModule
  ]
})
export class TablesModule { }
