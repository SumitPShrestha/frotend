import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ItemsService} from '../../items/items.service';
import {ItemsCreateComponent} from '../items-create/items-create.component';
import {ItemsEditComponent} from '../items-edit/items-edit.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faCoffee, faEdit, faTrash, faPlus, faBan, faCheckSquare, faListAlt,
  faExclamationTriangle, faCheckCircle, faPowerOff} from '@fortawesome/free-solid-svg-icons';
import { AlertService} from '../../_alert';
@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  items;

  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faBan = faBan;
  faCheckSquare = faCheckSquare;
  faListAlt = faListAlt;
  faExclamationTriangle = faExclamationTriangle;
  faCheckCircle = faCheckCircle;
  faPowerOff = faPowerOff;

  bsModalRef: BsModalRef;
  addPopupOn = false;
  subitemslist;
  itemToDeactivate;
  itemToDelete;

  constructor(private itemsService: ItemsService, private modalService: BsModalService, private alertService: AlertService) { }
  fetchAllItems() {
    this.itemsService.getAllItems().subscribe(items => {
      this.items = items;
    });
  }

  ngOnInit() {
    this.itemsService.getAllItems().subscribe(items => {
      this.items = items;
    });
  }

  openCreateModal() {
    this.addPopupOn = true;
    const initialState = {
      items: this.items,
      title: 'Modal with component',
      closeBtnName: 'Close'
    };
    this.bsModalRef = this.modalService.show(ItemsCreateComponent, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg', initialState});
    this.bsModalRef.content.emitService.subscribe((emittedValue) => {
      if (emittedValue && emittedValue.length > 0 ) {
        this.alertService.success('Item Added Successfully !!! ', 'crud-alert' , 5000);
        this.items.push(emittedValue[0]);
      }
      this.addPopupOn = false;
    });
  }

  openEditModal(item) {
    const initialState = {
      itemDetails: item,
      itemsList: this.items
    };
    this.bsModalRef = this.modalService.show(ItemsEditComponent, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg', initialState});
    this.bsModalRef.content.emitService.subscribe((emittedValue) => {
      if (emittedValue && emittedValue.length > 0 ) {
        this.alertService.success('Item Edited Successfully !!! ', 'crud-alert' , 5000);
        this.items.forEach( (it, idx) => {
          if ( it.id === emittedValue[0].id) {
            this.items[idx] = emittedValue[0];
          }
        });
      }
    });
  }
  populateSubItemsList(item) {
    this.subitemslist = '<ul>';
    item.subItems.forEach(each => {
      const subItemName = this.items.filter( (itemInst) => {
        return itemInst.id === each.ItemKey;
      });
      this.subitemslist = this.subitemslist + '<li>' + subItemName[0].ItemName + '</li>';
      });
    this.subitemslist = this.subitemslist + '</ul>';
  }

  openDeactivateModal(itemDetails, template) {
    this.itemToDeactivate = itemDetails;

    this.bsModalRef = this.modalService.show(template, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-md'});
  }

  openActivateModal(itemDetails, template) {
    this.itemToDeactivate = itemDetails;

    this.bsModalRef = this.modalService.show(template, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-md'});
  }

  deactivateItem(item, activationtype) {
    item.IsActive = activationtype === 'D' ? 0 : 1;
    item.UpdatedBy = JSON.parse(localStorage.getItem('currentUser')).id;
    this.itemsService.deactivateItem(item).subscribe(saveditems => {
      if (saveditems) {
        this.alertService.success(
          activationtype === 'D' ? 'Item Deactivated Successfully !!! ' : 'Item Activated Successfully !!! ', 'crud-alert' , 5000);
        this.bsModalRef.hide();
      } else {
        this.alertService.warn(activationtype === 'D' ? 'Could not deactivate !!! ' : 'Could not activate !!! ', 'crud-alert' , 5000);
        this.bsModalRef.hide();
      }
    });
  }

  openDeleteModal(itemDetails, template) {
    this.addPopupOn = true;
    this.itemToDelete = itemDetails;
    this.bsModalRef = this.modalService.show(template, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-md'});
  }

  deleteItem(item) {
    item.IsDeleted = 1;
    item.IsActive = 0;
    item.DeletedBy = JSON.parse(localStorage.getItem('currentUser')).id;
    this.itemsService.deleteItem(item).subscribe(saveditems => {
      console.log("deleted item ---> ", JSON.stringify(saveditems));
      if (saveditems) {
        this.alertService.success('Item Deleted Successfully !!! ', 'crud-alert' , 5000);
        this.itemsService.getAllItems().subscribe(items => {
          this.items = items;
          this.addPopupOn = false;
        });
        this.bsModalRef.hide();
      } else {
        this.alertService.warn('Could not delete !!! ', 'crud-alert' , 5000);
        this.bsModalRef.hide();
        this.addPopupOn = false;
      }
    });
  }

  closeDeleteModal(modal) {
    this.addPopupOn = false;
    modal.hide();
  }

}
