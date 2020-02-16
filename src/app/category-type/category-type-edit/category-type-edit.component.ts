import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {BsModalRef} from "ngx-bootstrap";
import {CategoryTypeService} from "../category-type.service";

@Component({
  selector: 'app-category-type-edit',
  templateUrl: './category-type-edit.component.html',
  styleUrls: ['./category-type-edit.component.css']
})
export class CategoryTypeEditComponent implements OnInit, AfterViewInit {
  @Input() categoryTypeDetails: any;
  @Input() categoryTypeList;
  editCategoryTypeForm: FormGroup;
  faCross = faTimesCircle;
  categoryType;
  @Output() emitService = new EventEmitter();
  constructor( public modalRef: BsModalRef, private formBuilder: FormBuilder , private catTypeService: CategoryTypeService) { }

  ngOnInit() {
    this.editCategoryTypeForm = this.formBuilder.group({
      id: [''],
      categoryType: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      UpdatedBy: JSON.parse(localStorage.getItem('currentUser')).id
    });
  }

  ngAfterViewInit() {
    this.editCategoryTypeForm.controls.id.setValue(this.categoryTypeDetails.id);
    this.editCategoryTypeForm.controls.categoryType.setValue(this.categoryTypeDetails.CategoryType);
    this.editCategoryTypeForm.controls.description.setValue(this.categoryTypeDetails.Description);
    this.editCategoryTypeForm.controls.UpdatedBy.setValue(JSON.parse(localStorage.getItem('currentUser')).id);
  }

  onSubmitCategoryType(err) {
    if (this.editCategoryTypeForm.invalid) {
      return;
    }
    this.catTypeService.updateCatType(this.editCategoryTypeForm.value).subscribe(saveditems => {
      if (saveditems) {
        this.emitService.next(saveditems)
        this.modalRef.hide();
      } else {
        this.emitService.next([]);
        this.modalRef.hide();
      }
    });
  }

  closeModal() {
    this.emitService.next([]);
    this.modalRef.hide();
  }

  get f() { return this.editCategoryTypeForm.controls; }
  onReset() {
    this.ngAfterViewInit();
  }

}
