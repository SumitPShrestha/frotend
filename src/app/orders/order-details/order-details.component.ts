import {Component, EventEmitter, OnInit, Output, Input, AfterViewInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OrdersService} from "../orders.service";
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {ModalDirective} from "ngx-bootstrap";
import {AlertService} from "../../_alert/alert.service";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, AfterViewInit {
  @Input('') order: any;
  @ViewChild('confirmModal', { static: false }) confirmModal: ModalDirective;
  editOrderForm: FormGroup;
  orderDetails;
  orderToDelete;
  faCross = faTimesCircle;
  bsModalRef: BsModalRef;
  qtyJson ;
  @Output() emitService = new EventEmitter();

  constructor( public modalRef: BsModalRef, private modalService: BsModalService, private formBuilder: FormBuilder , private orderService: OrdersService , private alertService: AlertService) {
  }

  getQtyformGroup(): FormGroup {
    return this.formBuilder.group({
      quantity: ['', Validators.required, Validators.min(1), Validators.max(99)]
    });
  }


  ngOnInit() {
    this.orderService.getOrderDetails(this.order.id).subscribe(val => {
      this.orderDetails = val;
      this.qtyJson = val;
    });
    this.orderDetails = [];
    this.editOrderForm = this.formBuilder.group({
      quantity: ['', Validators.required, Validators.min(1), Validators.max(99)]
    });

    // this.editOrderForm = new FormGroup({
    //   qtyArray: this.formBuilder.array([
    //     this.getQtyformGroup()
    //   ])
    // });
  }

  addItem() {
    const newItem = {status: 'new'};
    this.orderDetails.push(newItem);
  }

  ngAfterViewInit() {
    const orderDetailsKey = [];
  }

  closeModal() {
    this.emitService.next([]);
    this.modalRef.hide();
  }

  updateQuantity(id, newValue) {
    const item = this.qtyJson.find(x => x.id === id);
    if (item) {
      item.Quantity = newValue;
    }
  }

  updateOrder() {
    this.qtyJson.forEach(qty => {
      this.orderService.updateOrderDetails(qty).subscribe( updatedOrder => {
        if (updatedOrder) {
          this.alertService.success(
            'Order updated successfully.', 'crud-alert' , 5000);
        } else {
          this.alertService.warn('Error updating order.', 'crud-alert' , 5000);
          this.bsModalRef.hide();
        }
      });
    });
  }

  openDeleteModal(detail, template) {
    this.orderToDelete = detail;
    this.bsModalRef = this.modalService.show(template, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-sm'});
  }

  closeConfirmationModal() {
    this.emitService.next([]);
    this.bsModalRef.hide();
  }

  deleteOrder(detail) {
    this.orderService.deleteOrder(detail.id).subscribe(saveditems => {
      this.closeConfirmationModal();
      this.orderService.getOrderDetails(this.order.id).subscribe(val => {
        this.orderDetails = val;
      });
      this.qtyJson = this.qtyJson.filter(item => item.id !== detail.id);
    });
  }
}
