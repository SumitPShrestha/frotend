import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {BsModalRef} from "ngx-bootstrap";
import {CategoryTypeService} from "../category-type.service";

@Component({
  selector: 'app-category-type-create',
  templateUrl: './category-type-create.component.html',
  styleUrls: ['./category-type-create.component.css']
})
export class CategoryTypeCreateComponent implements OnInit {
  createCategoryTypeForm: FormGroup;
  faCross = faTimesCircle;
  offers;
  @Output() emitService = new EventEmitter();
  constructor( public modalRef: BsModalRef, private formBuilder: FormBuilder , private catTypeService: CategoryTypeService) { }

  ngOnInit() {
    this.createCategoryTypeForm = this.formBuilder.group({
      categoryType: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      CreatedBy: JSON.parse(localStorage.getItem('currentUser')).id
    });
  }

  onSubmitCategoryType(err) {
    if (this.createCategoryTypeForm.invalid) {
      return;
    }
    this.catTypeService.saveCatType(this.createCategoryTypeForm.value).subscribe(saveditems => {
      if (saveditems) {
        this.emitService.next(saveditems)
        this.modalRef.hide();
      }
    });
  }

  closeModal() {
    this.emitService.next([]);
    this.modalRef.hide();
  }
  get f() { return this.createCategoryTypeForm.controls; }
  onReset() {
    this.createCategoryTypeForm.reset();
  }

}
