import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fakedatabase } from '../models/fake-database';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  firstGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.firstGroup = this.formBuilder.group({
      usernameCtrl: ['', Validators.required],
      passwordCtrl: ['']
    })
  }

  ngOnInit(): void {
  }

  logIn() {
    let username = this.firstGroup.value.usernameCtrl;
    let password = this.firstGroup.value.passwordCtrl;

    let theUser = fakedatabase.filter((reg) => reg.username == username)[0];

    if (!theUser) {
      this.toastr.error('You are not registered on our system');
      return null;
    }

    if (theUser.password !== password) {
      this.toastr.error('Incorrect Password');
    }
    else {
      this.toastr.success('Successful login');
      this.router.navigate(['/logged-in']);
    }


  }

}
