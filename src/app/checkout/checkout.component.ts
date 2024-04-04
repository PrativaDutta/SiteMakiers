import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../services/general-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  token: any;
  header: any;
  id: any;
  checkoutData: any = {};
  showLoginForm: boolean = false;
  showCouponForm: boolean = false;
  userAddress: any = [];
  productData: any = [];
  cartItems: any = { product_id: '', quantity: '', size: '', final_price: '', product_name: '' };
  products: any = [];
  couponCode: any;
  subtotal: any;
  discount: any;
  tax: any;
  shipping: any;
  grandtotal: any;
  billing_address_id: any;
  delivery_address_id: any;
 
  // payment gateway section variable starts--------------------------------------

  checkOutStatus: any = 0;
  payment_details: any;
  payu_key = '';
  payu_txnid = '';
  payu_amount = '';
  payu_productinfo = '';
  payu_firstname = '';
  payu_email = '';
  payu_phone = '';
  payu_lastname = '';
  payu_address1 = '';
  payu_address2 = '';
  payu_city = '';
  payu_state = '';
  payu_country = '';
  payu_zipcode = '';
  payu_udf1 = '';
  payu_udf2 = '';
  payu_udf3 = '';
  payu_udf4 = '';
  payu_surl = '';
  payu_furl = '';
  payu_curl = '';
  payu_hash = '';
  PAYMENT_URL = environment.baseUrl;
  //  payUurl = environment.payUurl;
  payUurl = '';

  // payment gateway section variable ends--------------------------------------

  constructor(private api: GeneralServiceService) { }

  ngOnInit(): void {
    this.api.currentId.subscribe(id => this.id = id);
    this.token = localStorage.getItem('token');
    this.header = {
      headers: {
        "Authorization": "Bearer " + this.token,
      }
    }
    this.checkoutOreder();
    this.getAddress();
    this.cartData();
  }
  checkoutOreder() {
    const checkoutData = new FormData();
    checkoutData.append('coupon_id', this.id);
    this.api.post('checkout', checkoutData, this.header).subscribe((response: any) => {
      // console.log(response);
      if (response.status == 1) {
        this.checkoutData = response.data;
        this.subtotal = this.checkoutData.subtotal;
        this.grandtotal = this.checkoutData.grandtotal;
        this.tax = this.checkoutData.tax;
        this.shipping = this.checkoutData.shipping;
        this.discount = this.checkoutData.discount;
      }
    })
  }
  toggleLoginForm() {
    this.showLoginForm = !this.showLoginForm;
  }
  ToggleCouponCode() {
    this.showCouponForm = !this.showCouponForm;
  }
  getAddress() {
    this.api.post('get-addresses', '', this.header).subscribe((response: any) => {
      // console.log(response);
      if (response.status == 1) {
        this.userAddress = response.data;
        this.userAddress.forEach((id:any)=>{
          this.billing_address_id = id .id ;
          this.delivery_address_id  = id .id;
        })
        // this.billing_address_id = this.userAddress.id;
        console.log(this.billing_address_id);
        // this.delivery_address_id = this.userAddress.id;
      }

    })
  }
  cartData() {
    this.api.post('cart', '', this.header).subscribe((response: any) => {
      // console.log(response);
      if (response.status == 1) {
        this.productData = response.data;
        // console.log( this.productData); 
        this.productData.forEach((data: any) => {
          // console.log(data);
          this.products.push({
            product_id: data.product_id,
            quantity: data.quantity,
            size: data.size,
            color:data.product.family_color,
            product_price:Math.round(data.product.product_price),
            final_price: data.product.final_price,
            product_name: data.product.product_name
          })
        })
        //  console.log(this.products);

      }
      else {
        // alert(response.message);
      }
    })
  }
  placeOrder() {
    const placeOrderData = new FormData();
    placeOrderData.append('CartItems', JSON.stringify(this.products));
    placeOrderData.append('coupon_code', this.couponCode);
    placeOrderData.append('subtotal', this.subtotal);
    placeOrderData.append('discount', this.discount);
    placeOrderData.append('tax', this.tax);
    placeOrderData.append('shipping', this.shipping);
    placeOrderData.append('grandtotal', this.grandtotal);
    placeOrderData.append('billing_address_id', this.billing_address_id);
    placeOrderData.append('delivery_address_id', this.delivery_address_id);
    placeOrderData.append('payment_gateway', 'hdfc');
    placeOrderData.append('request_from', 'web');

    this.api.post('place-order', placeOrderData, this.header).subscribe((response:any) => {
if (response.status == 1) {
  if (response.payment_gateway_redirect == 0) {
    window.location.href = response.redirect;
    return;
  }
  this.checkOutStatus = 1
  this.payment_details = response.data;
  if (this.payment_details.payUurl)
    this.payUurl = this.payment_details.payUurl;
  this.payu_key = this.payment_details.key;
  this.payu_txnid = this.payment_details.txn_id;
  this.payu_amount = this.payment_details.amount;
  this.payu_productinfo = this.payment_details.product_info;
  this.payu_firstname = this.payment_details.first_name;
  this.payu_email = this.payment_details.email;
  this.payu_phone = this.payment_details.phone;
  this.payu_lastname = this.payment_details.last_name;
  this.payu_address1 = this.payment_details.address;
  // this.payu_address2 = this.payment_details.address2;
  this.payu_city = this.payment_details.city;
  this.payu_state = this.payment_details.state;
  this.payu_country = this.payment_details.country;
  this.payu_zipcode = this.payment_details.zipcode;
  this.payu_udf1 = this.payment_details.udf1;
  this.payu_udf2 = this.payment_details.udf2;
  this.payu_udf3 = this.payment_details.udf3;
  this.payu_udf4 = this.payment_details.udf4;
  this.payu_surl = this.payment_details.surl;
  this.payu_furl = this.payment_details.furl;
  this.payu_curl = this.payment_details.curl;
  this.payu_hash = this.payment_details.hash;
  //  this.ngxService.start();
  //  $('.paymentLoader').show();
  setTimeout(function () {
    let form: HTMLFormElement = <HTMLFormElement>document.getElementById('paynow');
    form.submit();
  }, 1000)
} else {
  alert(response.message);
}

    })
  }
}
