import { Component, OnInit } from '@angular/core';
import {OffersService} from '../offers.service';
import { faEdit, faTrash, faPlus, faPowerOff, faCheckSquare} from '@fortawesome/free-solid-svg-icons';
import {OffersCreateComponent} from '../offers-create/offers-create.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {AlertService} from '../../_alert/alert.service';
import {OffersEditComponent} from "../offers-edit/offers-edit.component";

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {
  offers;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faCheckSquare = faCheckSquare;
  faPowerOff = faPowerOff;
  bsModalRef: BsModalRef;
  addPopupOn = false;
  offerToDeactivate;
  offerToDelete;
  codes;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg',
    initialState: []
  };

  constructor(private offersService: OffersService, private modalService: BsModalService, private alertService: AlertService) { }
  fetchAllOffers() {
    this.offersService.getAllOffers().subscribe(offers => {
      this.offers = offers;
    });
  }

  ngOnInit() {
    this.fetchAllOffers();
    this.offersService.getCodes().subscribe(codes => this.codes = codes);

  }

  openCreateModal() {
    const initialState = {
      offers: this.offers,
      title: 'Modal with component',
      closeBtnName: 'Close'
    };
    this.bsModalRef = this.modalService.show(OffersCreateComponent, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg', initialState});
    this.bsModalRef.content.emitService.subscribe((emittedValue) => {
      this.alertService.success('Offer Added Successfully !!! ', 'crud-alert' , 5000);
      this.fetchAllOffers();
    });
  }
  openEditModal(offer) {
    const initialState = {
      offerDetails: offer,
      offersList: this.offers
    };
    this.bsModalRef = this.modalService.show(OffersEditComponent, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg', initialState});
    this.bsModalRef.content.emitService.subscribe((emittedValue) => {
      if (emittedValue && emittedValue.length > 0 ) {
        console.log("saveditems", emittedValue);
        this.alertService.success('Offer Edited Successfully !!! ', 'crud-alert' , 5000);
        this.offers.forEach( (it, idx) => {
          if ( it.id === emittedValue[0].id) {
            this.offers[idx] = emittedValue[0];
          }
        });
      }
    });
  }
  openDeactivateModal(offerDetails, template) {
    this.offerToDeactivate = offerDetails;

    this.bsModalRef = this.modalService.show(template, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-md'});
  }

  openActivateModal(offerDetails, template) {
    this.offerToDeactivate = offerDetails;

    this.bsModalRef = this.modalService.show(template, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-md'});
  }

  deactivateOffer(offer, activationtype) {
    offer.IsActive = activationtype === 'D' ? 0 : 1;
    offer.UpdatedBy = JSON.parse(localStorage.getItem('currentUser')).id;
    this.offersService.deactivateOffer(offer).subscribe(saveditems => {
      if (saveditems) {
        this.alertService.success(
          activationtype === 'D' ? 'Offer Deactivated Successfully !!! ' : 'Offer Activated Successfully !!! ', 'crud-alert' , 5000);
        this.bsModalRef.hide();
      } else {
        this.alertService.warn(activationtype === 'D' ? 'Could not deactivate !!! ' : 'Could not activate !!! ', 'crud-alert' , 5000);
        this.bsModalRef.hide();
      }
    });
  }

  openDeleteModal(offerDetails, template) {
    this.addPopupOn = true;
    this.offerToDelete = offerDetails;
    this.bsModalRef = this.modalService.show(template, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-md'});
  }

  deleteOffer(offer) {
    offer.IsDeleted = 1;
    offer.IsActive = 0;
    offer.DeletedBy = JSON.parse(localStorage.getItem('currentUser')).id;
    this.offersService.deleteOffer(offer).subscribe(saveditems => {
      console.log("deleted item ---> ", JSON.stringify(saveditems));
      if (saveditems) {
        this.alertService.success('Offer Deleted Successfully !!! ', 'crud-alert' , 5000);
        this.offersService.getAllOffers().subscribe(offers => {
          this.offers = offers;
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
