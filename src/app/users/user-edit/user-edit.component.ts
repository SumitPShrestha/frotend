import {Component, EventEmitter, OnInit, Output, Input, AfterViewInit, ViewChild} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {UsersService} from '../users.service';
import {MustMatch} from '../../_helpers/must-match.validator';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, AfterViewInit {
  @Input() userDetails: any;
  @Input() usersList;
  editUserForm: FormGroup;
  faCross = faTimesCircle;
  roles;
  @Output() emitService = new EventEmitter();

  constructor(public modalRef: BsModalRef, private formBuilder: FormBuilder, private usersService: UsersService) {
  }

  ngOnInit() {

    this.editUserForm = this.formBuilder.group({
      id: [''],
      username: ['', [Validators.required, Validators.minLength(3)]],
      FirstName: ['', [Validators.required, Validators.minLength(3)]],
      MiddleName: ['', Validators.minLength(3)],
      LastName: ['', [Validators.required, Validators.minLength(3)]],
      Phone: ['', [Validators.minLength(9), Validators.maxLength(10), Validators.pattern('[0-9]+')]],
      Address: ['', Validators.minLength(3)],
      Email: ['', Validators.email],
      roleId: [[]],
      orgRoleId: [[]],
      Gender: [[]],
      UpdatedBy: [''],
      changePassword: [''],
      password: ['', Validators.minLength(6)],
      confirmPassword: [''],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
    this.usersService.getRoles().subscribe(roles => this.roles = roles);

  }

  ngAfterViewInit() {
    const roleKey = Array(this.userDetails.roles).map(role => role.id);

    this.editUserForm.controls.id.setValue(this.userDetails.id);
    this.editUserForm.controls.username.setValue(this.userDetails.username);
    this.editUserForm.controls.password.setValue(this.userDetails.password);
    this.editUserForm.controls.confirmPassword.setValue(this.userDetails.confirmPassword);
    this.editUserForm.controls.FirstName.setValue(this.userDetails.userInfo.firstName);
    this.editUserForm.controls.MiddleName.setValue(this.userDetails.userInfo.midName);
    this.editUserForm.controls.LastName.setValue(this.userDetails.userInfo.lastName);
    this.editUserForm.controls.Gender.setValue(this.userDetails.userInfo.gender);
    this.editUserForm.controls.DOB.setValue(this.userDetails.userInfo.dateOfBirth);
    this.editUserForm.controls.mobileNumber1.setValue(this.userDetails.userInfo.mobileNumber1);
    this.editUserForm.controls.mobileNumber2.setValue(this.userDetails.userInfo.mobileNumber2);
    this.editUserForm.controls.homeNumber.setValue(this.userDetails.userInfo.homeNumber);
    this.editUserForm.controls.workNumber.setValue(this.userDetails.userInfo.workNumber);
    this.editUserForm.controls.email.setValue(this.userDetails.userInfo.email);
    // this.editUserForm.controls.Address.setValue(this.userDetails.Address);
    this.editUserForm.controls.roleId.setValue(roleKey);
    this.editUserForm.controls.UpdatedBy.setValue(JSON.parse(localStorage.getItem('currentUser')).id);
    // this.editUserForm.controls.orgRoleId.setValue(this.userDetails.role.RoleKey);
  }

  onSubmitUsers(err) {
    console.log("form val", this.editUserForm.value);
    if (!this.editUserForm.value.changePassword) {
      delete this.editUserForm.value.password;
    }
    delete this.editUserForm.value.confirmPassword;
    if (this.editUserForm.invalid) {
      return;
    }
    this.usersService.updateUser(this.editUserForm.value).subscribe(savedusers => {
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

  get f() {
    return this.editUserForm.controls;
  }

  onReset() {
    this.ngAfterViewInit();
  }

}
