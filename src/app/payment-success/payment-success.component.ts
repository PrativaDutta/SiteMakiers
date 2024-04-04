import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { GeneralServiceService } from '../services/general-service.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  successId:any;
  amount = 0;
  order_id = '';
  product_info = '';
  txn_id = '';
  invoice_id = '';
  masterorderId = '';
  PaymentDetails :any;
  // currency = environment.currency;

  paymentStatus = 2;
  serviesUrl = {'hotel':'hotel','car':'car','tour':'tour','ticketing':'ticketing','restaurant':'restaurant','merchant':'merchant'};
  serviesName = '';
  serviesUrlName = '';
  confirmationVoucher = '';
  baseUrl = environment.baseUrl;
  fileUrl:any;
  token:any;
  header:any;

  constructor(private routes:ActivatedRoute,private router:Router,private api: GeneralServiceService, private titleService: Title) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.header = {
      headers: {
        "Authorization": "Bearer " + this.token,
      }
    }
    this.routes.data.subscribe(data => {
      // Set the title based on the data from the route
      this.titleService.setTitle(data.title);
    });
    // this.backendAPI.updateTitle('Payment Success')
    this.successId = this.routes.snapshot.params.id;
    try {
      if(btoa(atob(this.successId)) === this.successId){
        this.paymentStatus = 0;
        const sucessData = new FormData();
        sucessData.append("txnId", this.successId);
        sucessData.append("request_type",'get_success_data');
        this.api.post('get-order-data',sucessData,this.header)
        .subscribe((response:any)=>{
          if(response.status == 1){
            this.PaymentDetails = response.data;
            this.amount = this.PaymentDetails.amount;
            this.order_id = this.PaymentDetails.order_id;
            this.product_info = this.PaymentDetails.product_info;
            this.txn_id = this.PaymentDetails.txn_id;
            // this.invoice_id = this.PaymentDetails.invoice_id;
            this.masterorderId = this.PaymentDetails.orderId;
            this.serviesName = this.PaymentDetails.service;
            // this.serviesUrlName = this.serviesUrl[ this.serviesName];
            this.confirmationVoucher = this.PaymentDetails.invoice;
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

  downloadInvoice(){
        const sucessData = new FormData();
        sucessData.append("orderId", this.masterorderId);
        sucessData.append("request_type",'download_invoice');


        this.api.post('get-order-data',sucessData, {observe: 'response', responseType: 'blob'})
        .subscribe((response:any)=>{
          var a = document.createElement('a');
          var blob = new Blob([response.body], { type: "application/pdf" });
          var url= window.URL.createObjectURL(blob);
          a.href = url;
          a.download = this.invoice_id+".pdf";;
          document.body.append(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        },(error:any)=>{
          this.paymentStatus = 1;
          // this.openSnackBar('Server connection failed..', 'Cancel')
        })
  }

  print(): void {
    let printContents!: string;
    let popupWin!: any;
    const printData = new FormData();
    printData.append("orderId", this.masterorderId);
    printData.append("request_type",'print_invoice');
    this.api.post('get-order-data',printData,'').subscribe((response:any)=>{
      console.log(response.data);
          printContents = response.data;//document.getElementById('print-section').innerHTML;
          popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
          popupWin.document.open();
          popupWin.document.write(`
            <html>
              <head>
                <title>Odisha Tourism</title>
                <style>
                //........Customized style.......
                </style>
              </head>
          <body onload="window.print();window.close()">${printContents}</body>
            </html>`
          );
          popupWin.document.close();
      },(error:any)=>{
        // this.openSnackBar('Server connection failed..', 'Cancel');
      });
  }
 
}
