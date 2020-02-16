import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TablesService} from "../../tables/tables.service";
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AlertService} from "../../_alert/alert.service";
import {ItemsService} from "../../items/items.service";
import {OrdersService} from "../orders.service";
import {MessageService} from '../../core/service/message-service/message-service.service';


@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  createOrderForm: FormGroup;
  submitted = false;
  faCross = faTimesCircle;
  tableList;
  itemList;
  itemRate;
  bsModalRef: BsModalRef;
  @Output() emitService = new EventEmitter();
  constructor( public modalRef: BsModalRef, private modalService: BsModalService,
               private formBuilder: FormBuilder, private tableService: TablesService,
               private itemService: ItemsService, private alertService: AlertService,
               private orderService: OrdersService, private messageService: MessageService) { }

  ngOnInit() {
    this.createOrderForm = this.formBuilder.group({
      TableKey: ['', Validators.required],
      Status: ['1'],
      CreatedBy: JSON.parse(localStorage.getItem('currentUser')).id,
      CreatedOn: new Date(),
      orderDetail: new FormArray([])
    });

    this.tableService.getEmptyTable().subscribe(val => this.tableList = val);

    this.itemList = this.itemService.getAllItems().subscribe(val => {
      this.itemList = val;
    });
  }

  // convenience getters for easy access to form fields
  get f() { return this.createOrderForm.controls; }
  get t() { return this.createOrderForm.controls.orderDetail as FormArray; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.createOrderForm.invalid) {
      return;
    }
    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.createOrderForm.value, null, 4));
    this.orderService.addNewOrder(this.createOrderForm.value).subscribe(savedItems => {
        if (savedItems) {
          this.emitService.next(savedItems);
          this.modalRef.hide();
          this.alertService.success('Order Added successfully.', 'crud-alert' , 5000);
          this.messageService.sendMessage('order created', savedItems);
        } else {
          this.emitService.next([]);
          this.modalRef.hide();
          this.alertService.warn('Error updating order.', 'crud-alert' , 5000);
        }
    });
  }

  addItemRow() {
    this.t.push(this.formBuilder.group({
      ItemKey: ['', Validators.required],
      Quantity: ['', [Validators.required, Validators.min(1)]],
      CreatedBy: JSON.parse(localStorage.getItem('currentUser')).id,
      UserKey: JSON.parse(localStorage.getItem('currentUser')).id,
      Status: ['1']
    }));
  }

  removeItemRow(index) {
    this.t.removeAt(index);
  }

  displayFirstRow() {
    if ( this.t.length  === 0) {
      this.addItemRow();
    }
  }

  getRate(itemId) {
    console.log(itemId);
    this.itemService.findItem({id: itemId}).subscribe(val => {
      // console.log(val);
      this.itemRate = val[0].rate.Rate;
    });
  }

  onReset() {
    console.log(JSON.stringify(this.createOrderForm.value, null, 4));
    // reset whole form back to initial state
    this.submitted = false;
    this.createOrderForm.reset();
    this.t.clear();
  }

  closeModal() {
    this.emitService.next([]);
    this.modalRef.hide();
  }

}
