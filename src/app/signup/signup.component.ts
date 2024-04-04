import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralServiceService } from '../services/general-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  RegisterForm=new FormGroup({
    name: new FormControl('', Validators.required),
    mobile:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required),
    confirmpassword:new FormControl('',Validators.required),


   })
   users:any={};
   existingUsers:any=[];
   token:any;
   header:any;
  constructor(private api: GeneralServiceService, private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.header = {
      headers: {
        "Authorization": "Bearer " + this.token,
      }
    }
  }
  getRegisterData(){
    const registerData=new FormData();
    registerData.append('name', this.RegisterForm.value.name);
    registerData.append('email' ,this.RegisterForm.value.email);
    registerData.append('mobile', this.RegisterForm.value.mobile);
    registerData.append('password' ,btoa(this.RegisterForm.value.password));
    registerData.append('password_confirmation' ,btoa(this.RegisterForm.value.confirmpassword));
   
   this.api.post('auth/register',registerData,'').subscribe((response:any)=>{
      // console.log(response);
     if(response.status==1){
      this.users={
        name:this.RegisterForm.value.name,
        email:this.RegisterForm.value.email,
        mobile:this.RegisterForm.value.mobile,
        password:btoa(this.RegisterForm.value.password)

      }
      this.existingUsers.push(this.users);

      localStorage.setItem('users',JSON.stringify(this. existingUsers));

      this.snackBar.open(response.webmessage, 'Ok', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
      this.RegisterForm.reset();
      this.router.navigate(['/signin']);


     }
     else{
        this.snackBar.open('registration failed. Please check your credentials.', 'Ok', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
      this.RegisterForm.reset();
     
     }
   
      
    
   })
 }

}
