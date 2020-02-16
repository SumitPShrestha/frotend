import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OffersService} from "../offers.service";
import {BsModalRef} from "ngx-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-offers-edit',
  templateUrl: './offers-edit.component.html',
  styleUrls: ['./offers-edit.component.css']
})
export class OffersEditComponent implements OnInit, AfterViewInit {
  @Input() offerDetails: any;
  @Input() offersList;
  editOfferForm: FormGroup;
  faCross = faTimesCircle;
  offers;
  codes;
  @Output() emitService = new EventEmitter();
  constructor( public modalRef: BsModalRef, private formBuilder: FormBuilder , private offersService: OffersService) { }

  ngOnInit() {
    this.editOfferForm = this.formBuilder.group({
      id: [''],
      offerName: ['', [Validators.required, Validators.minLength(3)]],
      effectiveDateFrom: ['', [Validators.required]],
      effectiveDateTo: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.minLength(3)]],
      quantityRemarks: ['', [Validators.required, Validators.minLength(10)]],
      discountPercentage: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      maxDiscountAmt: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      UpdatedBy: JSON.parse(localStorage.getItem('currentUser')).id,
      offerType: [[]],
    });
    this.offersService.getCodes().subscribe(codes => this.codes = codes);

  }
  ngAfterViewInit() {
    this.editOfferForm.controls.id.setValue(this.offerDetails.id);
    this.editOfferForm.controls.offerName.setValue(this.offerDetails.OfferName);
    this.editOfferForm.controls.offerType.setValue(this.offerDetails.OfferType.toString());
    this.editOfferForm.controls.effectiveDateFrom.setValue(this.offerDetails.EffectiveDateFrom);
    this.editOfferForm.controls.effectiveDateTo.setValue(this.offerDetails.EffectiveDateTo);
    this.editOfferForm.controls.quantity.setValue(this.offerDetails.Quantity);
    this.editOfferForm.controls.quantityRemarks.setValue(this.offerDetails.QuantityRemarks);
    this.editOfferForm.controls.discountPercentage.setValue(this.offerDetails.DiscountPercentage);
    this.editOfferForm.controls.maxDiscountAmt.setValue(this.offerDetails.MaxDiscountAmount);
    this.editOfferForm.controls.UpdatedBy.setValue(JSON.parse(localStorage.getItem('currentUser')).id);
  }
  onSubmitOffer(err) {
    if (this.editOfferForm.invalid) {
      return;
    }
    this.offersService.updateOffer(this.editOfferForm.value).subscribe(saveditems => {
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

  get f() { return this.editOfferForm.controls; }
  onReset() {
    this.ngAfterViewInit();
  }

}
