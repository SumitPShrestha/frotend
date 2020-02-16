import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {first, map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {UsersService} from '../users.service';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../_helpers/must-match.validator';
@Component({
  selector: 'app-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {


  createUserForm: FormGroup;
  faCross = faTimesCircle;
  users;
  roles;
  userRole;
  @Output() emitService = new EventEmitter();
  constructor( public modalRef: BsModalRef, private formBuilder: FormBuilder , private usersService: UsersService) {  }

  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      FirstName: ['', [Validators.required, Validators.minLength(3)]],
      MiddleName: ['', Validators.minLength(3)],
      LastName: ['', [Validators.required, Validators.minLength(3)]],
      Phone: ['', [Validators.minLength(9), Validators.maxLength(10), Validators.pattern('[0-9]+')]],
      Address: ['', Validators.minLength(3)],
      Email: ['', Validators.email],
      selectedItemIds: [[]],
      CreatedBy: JSON.parse(localStorage.getItem('currentUser')).id,
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
    this.usersService.getRoles().subscribe(roles => this.roles = roles);

  }
  onSubmitUser(err) {
    if (this.createUserForm.invalid) {
      return;
    }
    this.usersService.saveUser(this.createUserForm.value).subscribe(savedusers => {
      if (savedusers) {
        this.emitService.next(savedusers)
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

  get f() { return this.createUserForm.controls; }
  onReset() {
    this.createUserForm.reset();
  }

}
