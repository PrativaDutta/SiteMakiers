import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralServiceService } from '../services/general-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm= new FormGroup({
   password: new FormControl('',Validators.required),
   confirm_password: new FormControl('',Validators.required),

  })

  password: string = '';
  confirmPassword: string = '';
  email: any = '';
  token: any = '';
  showPage = true;
  constructor(private route: ActivatedRoute, private api: GeneralServiceService,private router: Router,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
   
   
    this.verifyEmailNpassword();
    
  }

  verifyEmailNpassword() {
    this.email = this.route.snapshot.url[1].path;
    this.token = this.route.snapshot.url[2].path;
    this.api.get('verify-password/'+ this.email+'/' + this.token, '').subscribe((response: any) => {
      console.log(response); 
      if(response.status ===1){
       this.showPage= true;
      }
      else{
        this.showPage= false;
        // this.router.navigate(['/404'])
      }

    });
    console.log(this.route.snapshot.url[1].path, this.route.snapshot.url[2].path);

  }
  submitForm() {
    this.email = this.route.snapshot.url[1].path;
    this.token = this.route.snapshot.url[2].path;
   const  resetData = new FormData();
   resetData.append('email',this.email);
   resetData.append('password',btoa(this.resetForm.value.password));
   resetData.append('password_confirmation',btoa(this.resetForm.value.confirm_password));
   resetData.append('token',this.token);
   console.log(resetData);
   

    this.api.post('reset-password',resetData,'').subscribe((response:any)=>{
      console.log(response);
      this.snackBar.open(response.message , 'Ok', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
      
    })


    if (this.resetForm.value.password === this.resetForm.value.confirm_password) {
     
      console.log('Form submitted successfully');
    } else {
      console.log('Passwords do not match');
    }
  }
}
