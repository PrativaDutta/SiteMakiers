import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralServiceService } from '../services/general-service.service';

@Component({
  selector: 'app-payment-failure',
  templateUrl: './payment-failure.component.html',
  styleUrls: ['./payment-failure.component.css']
})
export class PaymentFailureComponent implements OnInit {
  failureID = '';
  PaymentDetails :any;
  amount = 0;
  order_id = '';
  product_info = '';
  txn_id = '';
  error_message = "";
  // currency = environment.currency;
  checkOutStatus = 0;

  // Patment PayU
  payment_details :any;
  payu_key = '';
  payu_txnid = '';
  payu_amount = '';
	payu_productinfo= '';
	payu_firstname= '';
	payu_email= '';
	payu_phone= '';
  payu_lastname= '';
	payu_address1= '';
	payu_address2= '';
	payu_city= '';
	payu_state= '';
	payu_country= '';
	payu_zipcode= '';
	payu_udf1= '';
  payu_udf2= '';
  payu_udf3= '';
  payu_udf4= '';
  payu_surl= '';
  payu_furl= '';
	payu_curl= '';
	payu_hash= '';
  PAYMENT_URL = environment.baseUrl;
  payUurl = environment.payUurl;
  paymentStatus = 2;

  // PayTm
  MID = '';
  ORDER_ID = '';
  CUST_ID = '';
  INDUSTRY_TYPE_ID = '';
  CHANNEL_ID = '';
  TXN_AMOUNT = '';
  WEBSITE = '';
  CALLBACK_URL = '';
  MSISDN = '';
  EMAIL = '';
  VERIFIED_BY = '';
  IS_USER_VERIFIED = '';
  CHECKSUMHASH = '';
  PayTmUrl = '';//environment.payTmUrl;
  // PayTm
  PAYMENT_GATEWAY = '';
 header:any;
 token:any;
  constructor(private routes:ActivatedRoute,private router:Router,private api: GeneralServiceService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.header = {
      headers: {
        "Authorization": "Bearer " + this.token,
      }
    }
    // this.backendAPI.updateTitle('Odisha Tourism | Payment Success')
    this.failureID = this.routes.snapshot.params.id;
    try {
      if(btoa(atob(this.failureID)) === this.failureID){
        this.paymentStatus = 0;
        const sucessData = new FormData();
        sucessData.append("txnId", this.failureID);
        sucessData.append("request_type",'get_failure_data');
        this.api.post('get-order-data',sucessData,this.header)
        .subscribe((response:any)=>{
          if(response.status == 1){
            this.PaymentDetails = response.data;
            this.amount = this.PaymentDetails.amount;
            this.order_id = this.PaymentDetails.order_id;
            this.product_info = this.PaymentDetails.product_info;
            this.txn_id = this.PaymentDetails.txn_id;
            this.error_message = this.PaymentDetails.error_message;
          }else{
            this.paymentStatus = 1;
            // this.openSnackBar(response.message, 'Cancel')
          }

        },(error:any)=>{
          this.paymentStatus = 1;
          // this.openSnackBar('Server connection failed..', 'Cancel')
        })
      }else{
        this.paymentStatus = 1;
      }
    } catch (error) {
      this.paymentStatus = 1;
    }


  }

  paymentRetry(){

    const successData = new FormData();
    successData.append("orderId", this.order_id);
    successData.append("request_type",'payment_retry');
    successData.append("request_from",'web');
    this.api.post('payment_retry',successData,'')
    .subscribe((response:any)=>{
      if(response.status == 1){
        this.checkOutStatus = 1;
        this.payment_details = response.data;
        this.PAYMENT_GATEWAY = response.payment_gateway;
        if(this.PAYMENT_GATEWAY == 'hdfc'){
          this.payu_key = this.payment_details.key;
          this.payu_txnid = this.payment_details.txn_id;
          this.payu_amount = this.payment_details.amount;
          this.payu_productinfo= this.payment_details.product_info;
          this.payu_firstname= this.payment_details.first_name;
          this.payu_email= this.payment_details.email;
          this.payu_phone= this.payment_details.phone;
          this.payu_lastname= this.payment_details.last_name;
          this.payu_address1= this.payment_details.address;
          // this.payu_address2= this.payment_details.address2;
          this.payu_city= this.payment_details.city;
          this.payu_state= this.payment_details.state;
          this.payu_country= this.payment_details.country;
          this.payu_zipcode= this.payment_details.zipcode;
          this.payu_udf1= this.payment_details.udf1;
          this.payu_udf2= this.payment_details.udf2;
          this.payu_udf3= this.payment_details.udf3;
          this.payu_udf4= this.payment_details.udf4;
          this.payu_surl= this.PAYMENT_URL + this.payment_details.surl;
          this.payu_furl= this.PAYMENT_URL + this.payment_details.furl;
          this.payu_curl= this.PAYMENT_URL + this.payment_details.curl;
          this.payu_hash= this.payment_details.hash;
          // this.ngxService.start();
          setTimeout(function(){
            let form: HTMLFormElement = <HTMLFormElement>document.getElementById('paynow');
            form.submit();
          },1000)
        }else if(this.PAYMENT_GATEWAY == 'paytm'){
          this.checkOutStatus = 1;
          // this.ngxService.start();
          this.PayTmUrl = this.payment_details.PAYTM_TXN_URL;
          this.MID = this.payment_details.MID;
          this.ORDER_ID = this.payment_details.ORDER_ID;
          this.CUST_ID = this.payment_details.CUST_ID;
          this.INDUSTRY_TYPE_ID = this.payment_details.INDUSTRY_TYPE_ID;
          this.CHANNEL_ID = this.payment_details.CHANNEL_ID;
          this.TXN_AMOUNT = this.payment_details.TXN_AMOUNT;
          this.WEBSITE = this.payment_details.WEBSITE;
          this.CALLBACK_URL = this.payment_details.CALLBACK_URL;
          this.MSISDN = this.payment_details.MSISDN;
          this.EMAIL = this.payment_details.EMAIL;
          this.VERIFIED_BY = this.payment_details.VERIFIED_BY;
          this.IS_USER_VERIFIED = this.payment_details.IS_USER_VERIFIED;
          this.CHECKSUMHASH = this.payment_details.CHECKSUMHASH;
          setTimeout(function(){
            let form: HTMLFormElement = <HTMLFormElement>document.getElementById('paytmnow');
            form.submit();
          },1000)
        }

      }else{
        // this.openSnackBar(response.message, 'Cancel')
      }

    },(error:any)=>{
      // this.openSnackBar('Server connection failed..', 'Cancel')
    })
  }

}
