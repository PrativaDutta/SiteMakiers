import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralServiceService } from '../services/general-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  LoginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })
  currentDateTime: any = '';
  token: any;
  header: any;
  constructor(private api: GeneralServiceService, private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router, public datepipe: DatePipe) { }

  ngOnInit(): void {

    if (localStorage.getItem('token') != null && localStorage.getItem('expire') != null) {
      this.router.navigate(['/']);
    }
    else {

    }
    this.token = localStorage.getItem('token');
    this.header = {
      headers: {
        "Authorization": "Bearer " + this.token,
      }
    }
  }
  getLoginData() {
    const loginData = new FormData();

    loginData.append('email', this.LoginForm.value.email);
    loginData.append('password', btoa(this.LoginForm.value.password));
    loginData.append('requestType', 'web');


    this.api.post('auth/login', loginData, '').subscribe((response: any) => {
      // console.log(response);
      if (response.status == 1) {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('expire', response.expires_in);

        this.currentDateTime = this.datepipe.transform(new Date(), 'h:mm:ss');
        localStorage.setItem('logintime', this.currentDateTime);
        window.location.reload();

        this.openSnackBar('login sucess', 'Ok');
        this.LoginForm.reset();
        window.location.reload();
        this.router.navigate(['/']);
      }
      else {
       this.openSnackBar('login failed. Please check your credentials.', 'Ok')
    
        this.LoginForm.reset();
      }
    })
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
