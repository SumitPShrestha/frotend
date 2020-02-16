import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {UserCreateComponent} from '../user-create/user-create.component';
import {UserEditComponent} from '../user-edit/user-edit.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  faCoffee,
  faEdit,
  faTrash,
  faPlus,
  faBan,
  faCheckSquare,
  faListAlt,
  faExclamationTriangle,
  faCheckCircle, faPowerOff
} from '@fortawesome/free-solid-svg-icons';
import { AlertService} from '../../_alert';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any;
  roles;

  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  bsModalRef: BsModalRef;
  addPopupOn = false;
  faBan = faBan;
  faCheckSquare = faCheckSquare;
  faListAlt = faListAlt;
  faExclamationTriangle = faExclamationTriangle;
  faCheckCircle = faCheckCircle;
  faPowerOff = faPowerOff;

  userToDeactivate;
  userToDelete;
  constructor(private userService: UsersService, private modalService: BsModalService, private alertService: AlertService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => this.users = users);
    // this.userService.getRoles().subscribe(roles => this.roles = roles);
  }
  openCreateModal() {
    this.addPopupOn = true;
    const initialState = {
      users: this.users,
      title: 'Modal with component',
      closeBtnName: 'Close'
    };
    this.bsModalRef = this.modalService.show(UserCreateComponent, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg', initialState});
    this.bsModalRef.content.emitService.subscribe((emittedValue) => {
      if (emittedValue && emittedValue.length > 0 ) {
        this.alertService.success('User Added Successfully !!! ', 'crud-alert' , 5000);
        this.users.push(emittedValue[0]);
      }
      this.addPopupOn = false;
    });
  }
  openEditModal(user) {
    const initialState = {
      userDetails: user,
      usersList: this.users
    };
    this.bsModalRef = this.modalService.show(UserEditComponent, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg', initialState});
    this.bsModalRef.content.emitService.subscribe((emittedValue) => {
      console.log("emitted", emittedValue);
      if (emittedValue && emittedValue.length > 0 ) {
        this.alertService.success('User Edited Successfully !!! ', 'crud-alert' , 5000);
        this.users.forEach( (it, idx) => {
          if ( it.id === emittedValue[0].id) {
            this.users[idx] = emittedValue[0];
          }
        });
      }
    });
  }
  openDeactivateModal(userDetails, template) {
    this.userToDeactivate = userDetails;

    this.bsModalRef = this.modalService.show(template, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-md'});
  }

  openActivateModal(userDetails, template) {
    this.userToDeactivate = userDetails;

    this.bsModalRef = this.modalService.show(template, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-md'});
  }

  deactivateUser(user, activationtype) {
    user.IsActive = activationtype === 'D' ? 0 : 1;
    user.UpdatedBy = JSON.parse(localStorage.getItem('currentUser')).id;
    this.userService.deactivateUser(user).subscribe(savedusers => {
      if (savedusers) {
        this.alertService.success(
          activationtype === 'D' ? 'User Deactivated Successfully !!! ' : 'User Activated Successfully !!! ', 'crud-alert' , 5000);
        this.bsModalRef.hide();
      } else {
        this.alertService.warn(activationtype === 'D' ? 'Could not deactivate !!! ' : 'Could not activate !!! ', 'crud-alert' , 5000);
        this.bsModalRef.hide();
      }
    });
  }

  openDeleteModal(userDetails, template) {
    this.addPopupOn = true;
    this.userToDelete = userDetails;
    this.bsModalRef = this.modalService.show(template, { animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-md'});
  }

  deleteUser(user) {
    user.IsDeleted = 1;
    user.IsActive = 0;
    user.DeletedBy = JSON.parse(localStorage.getItem('currentUser')).id;
    this.userService.deleteUser(user).subscribe(savedusers => {
      console.log("deleted user ---> ", JSON.stringify(savedusers));
      if (savedusers) {
        this.alertService.success('User Deleted Successfully !!! ', 'crud-alert' , 5000);
        this.userService.getUsers().subscribe(users => {
          this.users = users;
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
