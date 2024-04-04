import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralServiceService } from '../services/general-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  ResetForm=new FormGroup({
    email:new FormControl('',Validators.required),
   })
  
  constructor(private api:GeneralServiceService,private router: Router) { }

  ngOnInit(): void {
  }
  Resetpassword(){ 
   let email=this.ResetForm.value.email;
  //  console.log(email);
   this.api.get(`send-reset-password-link/${email}`,'').subscribe((response:any)=>{
      console.log(response);
      // else{
      //   this.router.navigate(['/404']);
      // }

  })

}
}
