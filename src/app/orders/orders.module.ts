import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {DataTablesModule} from 'angular-datatables';
import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersListComponent} from './orders-list/orders-list.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {ModalModule} from 'ngx-bootstrap';
import {OrderCreateComponent} from './order-create/order-create.component';
import {OrderEditComponent} from './order-edit/order-edit.component';
import {MessageService} from '../core/service/message-service/message-service.service';

@NgModule({
  declarations: [OrdersListComponent, OrderDetailsComponent, OrderCreateComponent, OrderEditComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    DataTablesModule,
    FontAwesomeModule,
    NgSelectModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [MessageService],
  entryComponents: [
    OrderDetailsComponent,
    OrderCreateComponent,
    OrderEditComponent
  ]
})
export class OrdersModule { }
