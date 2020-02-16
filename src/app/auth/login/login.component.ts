
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth.service';
import {faConciergeBell} from '@fortawesome/free-solid-svg-icons/faConciergeBell';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  faConciergeBell = faConciergeBell;
  invalidLogin = false;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['sumit', Validators.required],
      password: ['password', Validators.required]
    });
  }

  doLogin = () => {
    return this.authService.doLogin(this.loginForm.value)
      .subscribe(user => {
        if (user) {
          const returnUrl = this.route.snapshot.queryParams.returnUrl
          if (returnUrl && returnUrl !== '') {
            this.router.navigate([returnUrl]);
          } else {
            this.router.navigate(['users']);
          }
          this.invalidLogin = false;
        } else {
          console.log('error while login');
          this.invalidLogin = true;
        }
      }, error => {
        console.log('error while login');
        this.invalidLogin = true;
      });
  }

}
