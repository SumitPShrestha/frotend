import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../orders.service';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {OrderDetailsComponent} from '../order-details/order-details.component';
import {AlertService} from '../../_alert/alert.service';
import {OrderCreateComponent} from '../order-create/order-create.component';
import {OrderEditComponent} from '../order-edit/order-edit.component';
import {MessageService} from '../../core/service/message-service/message-service.service';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  ordersList;
  faEye = faEye;
  bsModalRef: BsModalRef;
  addPopupOn = false;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg',
    initialState: []
  };

  constructor(private orderService: OrdersService, private modalService: BsModalService, private alertService: AlertService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService
      .getMessages()
      .subscribe((message: string) => {
        console.log(message);

      });
    this.orderService.getAllOrders().subscribe(order => {
      this.ordersList = order;
    });

  }

  openDetailsModal(order) {
    const initialState = {
      order: order,
      list: this.ordersList
    };
    this.bsModalRef = this.modalService.show(OrderDetailsComponent, {
      animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg', initialState
    });
    this.bsModalRef.content.emitService.subscribe((emittedValue) => {
      if (emittedValue && emittedValue.length > 0) {
        this.alertService.success('Order Updated Successfully !!! ', 'crud-alert', 5000);
        this.ordersList.forEach((it, idx) => {
          if (it.id === emittedValue[0].id) {
            this.orderService.getOrderDetails(emittedValue[0].id).subscribe(val => {
              this.ordersList[idx].orderDetail = val;
            });
          }
        });
      }
    });
  }

  editOrderModal(order) {
    const initialState = {
      order: order,
      list: this.ordersList
    };
    this.bsModalRef = this.modalService.show(OrderEditComponent, {
      animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg', initialState
    });
    this.bsModalRef.content.emitService.subscribe((emittedValue) => {
      if (emittedValue && emittedValue.length > 0) {
        this.alertService.success('Order Updated Successfully !!! ', 'crud-alert', 5000);
        this.ordersList.forEach((it, idx) => {
          if (it.id === emittedValue[0].id) {
            this.orderService.getOrderDetails(emittedValue[0].id).subscribe(val => {
              emittedValue[0].orderDetail = val;
              this.ordersList[idx] = emittedValue[0];

            });
          }
        });
      }
    });
  }

  openCreateModal() {
    this.addPopupOn = true;
    const initialState = {
      closeBtnName: 'Close'
    };
    this.bsModalRef = this.modalService.show(OrderCreateComponent, {
      animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg', initialState
    });

    this.bsModalRef.content.emitService.subscribe((emittedValue) => {
      if (emittedValue && emittedValue.length > 0) {
        this.alertService.success('Order Added Successfully !!! ', 'crud-alert', 5000);
        this.orderService.getOrderDetails(emittedValue[0].id).subscribe(val => {
          emittedValue[0].orderDetail = val;
          this.ordersList.push(emittedValue[0]);
        });

      }
      this.addPopupOn = false;
    });
  }

  sendMessage() {
this.messageService.sendMessage('new-order', 'order created');
  }
}
