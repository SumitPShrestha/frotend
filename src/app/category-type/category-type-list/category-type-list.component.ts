import { Component, OnInit } from '@angular/core';
import {CategoryTypeService} from '../category-type.service';
import { faEdit, faTrash, faPlus, faPowerOff, faCheckSquare} from '@fortawesome/free-solid-svg-icons';
import {CategoryTypeCreateComponent} from "../category-type-create/category-type-create.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AlertService} from "../../_alert/alert.service";
import {CategoryTypeEditComponent} from "../category-type-edit/category-type-edit.component";

@Component({
  selector: 'app-category-type-list',
  templateUrl: './category-type-list.component.html',
  styleUrls: ['./category-type-list.component.css']
})
export class CategoryTypeListComponent implements OnInit {
  categoryTypes: any ;
  bsModalRef: BsModalRef;
  addPopupOn = false;
  faCheckSquare = faCheckSquare;
  faEdit = faEdit;
  faPowerOff = faPowerOff;
  faTrash = faTrash;
  categoryTypeToDeactivate;
  categoryTypeToDelete;

  constructor(private catTypeService: CategoryTypeService, private modalService: BsModalService, private alertService: AlertService) { }
  fetchAllCategory() {
    this.catTypeService.getCategoryTypes().subscribe( catTypes => {
      this.categoryTypes = catTypes;
    });
  }
  ngOnInit() {
    this.fetchAllCategory();
  }

  openCreateModal() {
    const initialState = {
      categoryTypes: this.categoryTypes,
      title: 'Modal with component',
      closeBtnName: 'Close'
    };
    this.bsModalRef = this.modalService.show(CategoryTypeCreateComponent, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg', initialState});
    this.bsModalRef.content.emitService.subscribe((emittedValue) => {
      this.alertService.success('Category Type Added Successfully !!! ', 'crud-alert' , 5000);
      this.fetchAllCategory();
    });
  }
  openEditModal(categoryType) {
    const initialState = {
      categoryTypeDetails: categoryType,
      categoryTypeList: this.categoryTypes
    };
    this.bsModalRef = this.modalService.show(CategoryTypeEditComponent, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg', initialState});
    this.bsModalRef.content.emitService.subscribe((emittedValue) => {
      if (emittedValue && emittedValue.length > 0 ) {
        console.log("saveditems", emittedValue);
        this.alertService.success('Category Type Edited Successfully !!! ', 'crud-alert' , 5000);
        this.categoryTypes.forEach( (it, idx) => {
          if ( it.id === emittedValue[0].id) {
            this.categoryTypes[idx] = emittedValue[0];
          }
        });
      }
    });
  }
  openDeactivateModal(categoryTypeDetails, template) {
    this.categoryTypeToDeactivate = categoryTypeDetails;

    this.bsModalRef = this.modalService.show(template, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-md'});
  }

  openActivateModal(categoryTypeDetails, template) {
    this.categoryTypeToDeactivate = categoryTypeDetails;

    this.bsModalRef = this.modalService.show(template, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-md'});
  }

  deactivateCategoryType(categoryType, activationtype) {
    categoryType.IsActive = activationtype === 'D' ? 0 : 1;
    categoryType.UpdatedBy = JSON.parse(localStorage.getItem('currentUser')).id;
    this.catTypeService.deactivateCatType(categoryType).subscribe(saveditems => {
      if (saveditems) {
        this.alertService.success(
          activationtype === 'D' ? 'Category Type Deactivated Successfully !!! ' : 'Category Type Activated Successfully !!! ', 'crud-alert' , 5000);
        this.bsModalRef.hide();
      } else {
        this.alertService.warn(activationtype === 'D' ? 'Could not deactivate !!! ' : 'Could not activate !!! ', 'crud-alert' , 5000);
        this.bsModalRef.hide();
      }
    });
  }
  openDeleteModal(categoryTypeDetails, template) {
    this.addPopupOn = true;
    this.categoryTypeToDelete = categoryTypeDetails;
    this.bsModalRef = this.modalService.show(template, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-md'});
  }
  deleteCategoryType(categoryType) {
    categoryType.IsDeleted = 1;
    categoryType.IsActive = 0;
    categoryType.DeletedBy = JSON.parse(localStorage.getItem('currentUser')).id;
    this.catTypeService.deleteCatType(categoryType).subscribe(saveditems => {
      console.log("deleted item ---> ", JSON.stringify(saveditems));
      if (saveditems) {
        this.alertService.success('Category Type Deleted Successfully !!! ', 'crud-alert' , 5000);
        this.catTypeService.getCategoryTypes().subscribe(categoryTypes => {
          this.categoryTypes = categoryTypes;
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
