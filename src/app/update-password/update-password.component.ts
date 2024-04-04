import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralServiceService } from '../services/general-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  update_PasswordForm= new FormGroup({
    current_password:new FormControl('',Validators.required),
    new_password: new FormControl('', Validators.required),
    confirm_password:new FormControl('',Validators.required),
  })
token:any;
header:any;
  constructor(private api: GeneralServiceService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token'); 
    // console.log(this.token);
    
    this.header =  {
      headers:{
        "Authorization": "Bearer " + this.token,
    }
      
    }
  }
  submit(){
   const updatepassword= new FormData();
   updatepassword.append('old_password',btoa(this.update_PasswordForm.value.current_password));
   updatepassword.append('password',btoa(this.update_PasswordForm.value.new_password));
   updatepassword.append('password_confirmation',btoa(this.update_PasswordForm.value.confirm_password));


    this.api.post('update-password',updatepassword,this.header).subscribe((response:any)=>{
      // console.log(response);
      if(response.status==1){
        this.snackBar.open('password updated sucessfully', 'Ok', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.update_PasswordForm.reset();
      }
      else{
        this.snackBar.open('failed to password update', 'Ok', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.update_PasswordForm.reset();
      }
     
    })
  }

}
