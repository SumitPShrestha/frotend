import {Component, EventEmitter, OnInit, Output, Input, AfterViewInit, ViewChild} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {ItemsService} from '../items.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-items-edit',
  templateUrl: './items-edit.component.html',
  styleUrls: ['./items-edit.component.css']
})
export class ItemsEditComponent implements OnInit, AfterViewInit {
  @Input() itemDetails: any;
  @Input() itemsList;

  imageChangedEvent: any = '';
  defaultImage = 'data:image/png;base64,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';
  editItemForm: FormGroup;
  faCross = faTimesCircle;
  origSubItems;
  @Output() emitService = new EventEmitter();
  constructor( public modalRef: BsModalRef, private formBuilder: FormBuilder , private itemsService: ItemsService) { }

  ngOnInit() {

    this.editItemForm = this.formBuilder.group({
      id: [''],
      itemName: ['', [Validators.required, Validators.minLength(3)]],
      itemDescription: ['', [Validators.required, Validators.minLength(10)]],
      itemRate: ['', [Validators.required, Validators.min(1)]],
      itemHasSubItem: [''],
      selectedItemIds: [''],
      UpdatedBy: [''],
      itemImage: [''],
      OrigItemImage: [''],
      OrigSubItems: [''],
      OrigItemRate: ['']
    });

  }

  ngAfterViewInit() {
    const subitemsKey = [];
    this.itemDetails.subItems.forEach(each => {
      subitemsKey.push(each.ItemKey);
    })
    this.editItemForm.controls.id.setValue(this.itemDetails.id);
    this.editItemForm.controls.itemName.setValue(this.itemDetails.ItemName);
    this.editItemForm.controls.itemDescription.setValue(this.itemDetails.Description);
    this.editItemForm.controls.itemRate.setValue(this.itemDetails.rate.Rate);
    this.editItemForm.controls.itemHasSubItem.setValue(this.itemDetails.HasSubItem);

    this.itemsService.getItemImage({itemid: this.itemDetails.id}).subscribe(val => {
      if (val[0]) {
        this.editItemForm.controls.itemImage.setValue(val[0].Image);
        this.editItemForm.controls.OrigItemImage.setValue(val[0].Image);
      } else {
        this.editItemForm.controls.itemImage.setValue(this.defaultImage);
      }
    });

    this.editItemForm.controls.selectedItemIds.setValue(subitemsKey);
    this.editItemForm.controls.UpdatedBy.setValue(JSON.parse(localStorage.getItem('currentUser')).id);
    this.editItemForm.controls.OrigSubItems.setValue(subitemsKey);
    this.editItemForm.controls.OrigItemRate.setValue(this.itemDetails.rate.Rate);

  }

  onSubmitItem(err) {
    if (this.editItemForm.invalid) {
      return;
    }
    this.itemsService.updateItem(this.editItemForm.value).subscribe(saveditems => {
      if (saveditems) {
        this.emitService.next(saveditems)
        this.modalRef.hide();
      } else {
        this.emitService.next([]);
        this.modalRef.hide();
      }
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.editItemForm.markAsDirty();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.editItemForm.controls.itemImage.setValue(event.base64);
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  closeModal() {
    this.emitService.next([]);
    this.modalRef.hide();
  }

  get f() { return this.editItemForm.controls; }
  onReset() {
    this.imageChangedEvent = null;
    this.ngAfterViewInit();
    this.editItemForm.markAsPristine();
  }

}
