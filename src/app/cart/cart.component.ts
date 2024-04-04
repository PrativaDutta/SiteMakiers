import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../services/general-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  couponForm = new FormGroup({
    getCoupon: new FormControl('', Validators.required),
    // couponCode: new FormControl('', Validators.required),
  })
  token: any;
  header: any;
  productData: any = [];
  size: any;
  product: any = {};
  cartId: any;
  counter: any = 0;
  qnty: any;
  i: any;
  subtotal: any = 0;
  data: any = [];
  couponCode: any;
  amount: any;
  amount_type: any;
  grandTotal: any;
  product_base_price: any;
  checked: any;
  unchcked: any;
  event: any;
  id:any;

  constructor(private api: GeneralServiceService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    // console.log(this.token);

    this.header = {
      headers: {
        "Authorization": "Bearer " + this.token,
      }

    }
    this.cartData();
    this.getCoupon();
  }
  cartData() {
    this.api.post('cart', '', this.header).subscribe((response: any) => {
      // console.log(response);
      if (response.status == 1) {
        this.productData = response.data;
        // console.log( this.productData);
        this.subtotal = 0;
        this.productData.forEach((product: any) => {
          this.subtotal += product.product.final_price * product.quantity;
          // console.log(this.subtotal);
          this.grandTotal = this.subtotal;
          // console.log(this.subtotal);
        });
      }
      else {
        // alert(response.message)
      }
    }
    );

  }
  add(product: any) {
    this.product_base_price = product.product.final_price;
    console.log(this.product_base_price);
    product.quantity += 1;
    console.log(product.quantity);
    product.product.product_price = this.product_base_price * product.quantity;
    // console.log(product);
  }
  minus(product: any) {
    this.product_base_price = product.product.final_price;
    console.log(product);
    if (product.quantity > 1) {
      product.quantity -= 1;
      product.product.product_price = this.product_base_price * product.quantity;
    }
  }
  deleteCartItem(cartId: any) {
    console.log(cartId);
    const cartData = new FormData();
    cartData.append('cart_id', cartId);
    this.api.post('edit-cart', cartData, this.header).subscribe((response: any) => {
      console.log(response);
      this.cartData();
      this.snackBar.open('item deleted from cart', 'Ok', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    });
  }
  editItemQuantity(cartId: any, quantity: any) {
    console.log(cartId, quantity);
    const cartData = new FormData();
    cartData.append('cart_id', cartId);
    cartData.append('qty', quantity);
    this.api.post('edit-cart', cartData, this.header).subscribe((response: any) => {
      // console.log(response);
      if(response.status ==1){
        // this.cartData();
      }
    })
  }
  clearCart() {
    this.api.post('clear-cart', '', this.header).subscribe((response: any) => {
 
      if (response.status == 1) {
        this.cartData();
      }
    })
  }
  getCoupon() {
    this.api.post('get-coupons', '', this.header).subscribe((response: any) => {
      // console.log(response);
      if (response.status == 1) {
        this.data = response.data;
      }
      else {
        // alert(response.message);
      }

    })
  }
  getCouponData(event: any,id:any) {
    this.couponCode = event.target.value;
    console.log(this.couponCode);
    this.event = event;
    this.id = id;
    console.log(id);
    this.api.changeId(id);
    
  }
  verifyCoupon() {
    const couponCode = new FormData();
    couponCode.append('code', this.couponCode);
    this.api.post('verify-coupon', couponCode, this.header).subscribe((response: any) => {
      console.log(response);
      if (response.status == 1) {
        this.data.forEach((item: any) => {
          this.amount = item.amount;
          this.amount_type = item.amount_type;
          // console.log(this.amount);
          // console.log(this.amount_type);
          if (this.event.target.checked) {
            if (this.amount_type == 'Fixed' && this.subtotal > this.amount) {
              this.grandTotal = this.subtotal - this.amount;
              this.snackBar.open('coupon applied ', 'Ok', {
                duration: 5000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
              });
            }
           
          }
          else if (this.event.target.checked == false) {
            this.grandTotal = this.subtotal;
          }
        })
      }
    })
  }
 
}
