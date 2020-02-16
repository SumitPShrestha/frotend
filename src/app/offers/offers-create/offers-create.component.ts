import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {OffersService} from '../offers.service';

@Component({
  selector: 'app-offers-create',
  templateUrl: './offers-create.component.html',
  styleUrls: ['./offers-create.component.css']
})
export class OffersCreateComponent implements OnInit {
  createOfferForm: FormGroup;
  faCross = faTimesCircle;
  codes;
  @Output() emitService = new EventEmitter();
  constructor( public modalRef: BsModalRef, private formBuilder: FormBuilder , private offersService: OffersService) { }

  ngOnInit() {
    this.createOfferForm = this.formBuilder.group({
      offerName: ['', [Validators.required, Validators.minLength(3)]],
      // offerType: ['', [Validators.required, Validators.minLength(10)]],
      effectiveDateFrom: ['', [Validators.required]],
      effectiveDateTo: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.minLength(3)]],
      quantityRemarks: ['', [Validators.required, Validators.minLength(10)]],
      discountPercentage: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      maxDiscountAmt: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      CreatedBy: JSON.parse(localStorage.getItem('currentUser')).id,
      offerType: [[]],
    });
    this.offersService.getCodes().subscribe(codes => this.codes = codes);
  }
  onSubmitOffer(err) {
    if (this.createOfferForm.invalid) {
      return;
    }
    this.offersService.saveOffer(this.createOfferForm.value).subscribe(saveditems => {
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
  get f() { return this.createOfferForm.controls; }
  onReset() {
    this.createOfferForm.reset();
  }

}
