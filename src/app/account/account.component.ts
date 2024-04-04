import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralServiceService } from '../services/general-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
addressForm = new FormGroup({
  fname:new FormControl('',Validators.required),
  lname:new FormControl('',Validators.required),
  address:new FormControl('',Validators.required),
  city:new FormControl('',Validators.required),
  country: new FormControl('',Validators.required),
  mobile: new FormControl('',Validators.required),
  state: new FormControl('',Validators.required),
  pincode: new FormControl('',Validators.required),
  email: new FormControl('',Validators.required),
})
token:any;
header:any;
value:any;
  constructor(private api:GeneralServiceService,private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') == null && localStorage.getItem('expire') == null) {
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
  save(){
    const addressData = new FormData();
    addressData.append('first_name',this.addressForm.value.fname);
    addressData.append('last_name',this.addressForm.value.lname);
    addressData.append('city',this.addressForm.value.city);
    addressData.append('country',this.addressForm.value.country);
    addressData.append('mobile',this.addressForm.value.mobile);
    addressData.append('address',this.addressForm.value.address);
    addressData.append('state',this.addressForm.value.state);
    addressData.append('pincode',this.addressForm.value.pincode);
    addressData.append('dda_dba',this.value);
    
this.api.post('post-address',addressData,this.header).subscribe((response:any)=>{
  // console.log(response);
  
})
  }
  editaddress(event:any){
   this.value = event.target.value;
  //  console.log(this.value);
  }

}
