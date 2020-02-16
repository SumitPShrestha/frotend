import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AlertService} from "../../_alert/alert.service";
import {OrdersService} from "../orders.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService, ModalDirective} from "ngx-bootstrap";
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {ItemsService} from "../../items/items.service";
import {TablesService} from "../../tables/tables.service";

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit, AfterViewInit {
  @Input('') order: any;
  @ViewChild('confirmModal', { static: false }) confirmModal: ModalDirective;
  editOrderForm: FormGroup;
  tableList;
  itemList;
  submitted = false;
  orderDetails;
  orderToDelete;
  itemName;
  ItemRate;

  faCross = faTimesCircle;
  bsModalRef: BsModalRef;
  qtyJson ;
  @Output() emitService = new EventEmitter();

  constructor(public modalRef: BsModalRef,
              private modalService: BsModalService,
              private formBuilder: FormBuilder,
              private tableService: TablesService,
              private orderService: OrdersService ,
              private itemService: ItemsService ,
              private alertService: AlertService) { }

  ngOnInit() {
    this.orderDetails = this.order.orderDetail;
    this.editOrderForm = this.formBuilder.group({
      id: [''],
      TableKey: ['', Validators.required],
      Status: ['1'],
      UpdatedBy: JSON.parse(localStorage.getItem('currentUser')).id,
      UpdatedOn: new Date(),
      orderDetail: new FormArray([])
    });

    this.tableService.getAllTables().subscribe(val => this.tableList = val);

    this.itemService.getAllItems().subscribe(val => {
      this.itemList = val;
      // this.orderDetails.forEach( detail => {
      //   const getItem = this.itemList.filter(
      //     item => item.id === detail.ItemKey.id);
      //   detail.ItemRate = getItem[0].rate.Rate;
      // });
    });

  }

  // convenience getters for easy access to form fields
  get f() { return this.editOrderForm.controls; }
  get t() { return this.editOrderForm.controls.orderDetail as FormArray; }

  ngAfterViewInit() {

    this.f.TableKey.setValue(this.order.TableKey);
    this.f.id.setValue(this.order.id);
    this.orderDetails.forEach( detail => {
      console.log("Item id -------", detail.ItemKey.ItemName);
      this.itemService.findItem({id: detail.ItemKey.id}).subscribe(val => {
        detail.ItemRate = val[0].rate.Rate;
        this.t.push(this.formBuilder.group({
          OrderDetailKey: detail.id,
          ItemKey: [detail.ItemKey.id, Validators.required],
          ItemRate : [detail.ItemRate],
          Quantity: [detail.Quantity, [Validators.required, Validators.min(1)]],
          Status: '1',
          IsDeleted: '0',
          UpdatedBy: JSON.parse(localStorage.getItem('currentUser')).id,
          DeletedBy: undefined,
          DeletedOn: undefined,
        }));
      });

    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editOrderForm.invalid) {
      return;
    }
    // display form values on success
    // console.log('Success!!\n\n' + JSON.stringify(this.editOrderForm.value, null, 4));
    this.orderService.updateOrderDetails(this.editOrderForm.value).subscribe(savedItems => {
      console.log("Saved items : ", savedItems);
      if (savedItems) {
          this.emitService.next([savedItems]);
          this.modalRef.hide();
      } else {
        this.emitService.next([]);
        this.modalRef.hide();
        this.alertService.warn('Error updating order.', 'crud-alert' , 5000);
      }
    });
  }

  addItemRow() {
    const newItem = this.formBuilder.group({
      ItemKey: ['', Validators.required],
      ItemRate: ['0'],
      Quantity: ['', [Validators.required, Validators.min(1)]],
      CreatedBy: JSON.parse(localStorage.getItem('currentUser')).id,
      UserKey: JSON.parse(localStorage.getItem('currentUser')).id,
      Status: ['1'],
      IsDeleted: ['0']
    });
    newItem.controls.Quantity.setValue(1);
    this.t.push(newItem);
  }

  removeItemRow(index) {
    this.t.controls[index]['controls'].IsDeleted.setValue(1);
    this.t.controls[index]['controls'].Status.setValue(0);
    this.t.controls[index]['controls'].DeletedBy.setValue(JSON.parse(localStorage.getItem('currentUser')).id);
    this.t.controls[index]['controls'].DeletedOn.setValue(new Date());
  }

  getItemDetail(itemId, order, idx) {
    this.itemService.findItem({id: itemId}).subscribe(val => {
      this.t.controls[idx]['controls'].ItemRate.setValue(val[0].rate.Rate);
    });
  }
  getItemRate(itemId) {
    this.itemService.findItem({id: itemId}).subscribe(val => {
        return val[0].rate.Rate;
    });
  }
  closeModal() {
    this.emitService.next([]);
    this.modalRef.hide();
  }

}
