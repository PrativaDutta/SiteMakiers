import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../services/general-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categorydata: any;
  subCategory: any;
  token: any;
  productData: any = [];
  productLength: any;
  isLoggedIn = false;
  subtotal: any;
  header: any;
  cartItem: any = 0;
  constructor(private api: GeneralServiceService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
      console.log('User is not logged in');
    }
    this.header = {
      headers: {
        "Authorization": "Bearer " + this.token,
      }
    }
    this.CategoryData();
    this.getCartData();
  }
  CategoryData() {
    this.api.get('home/categories', '').subscribe(
      (data: any) => {
        this.categorydata = data.data;
        // console.log(this.categorydata);
      },
      (error) => {
        console.error('Error fetching image  data', error);
      }
    );
  }
  onSubcategoryClick(subcategory: any) {
    // console.log(subcategory);
  }
  logout() {

    this.api.post('auth/logout', '', this.header).subscribe((response: any) => {
      //  console.log(response); 
      

      localStorage.removeItem('token');
      localStorage.removeItem('expire');
      localStorage.removeItem('logintime');
      this.router.navigate(['/']);
      this.isLoggedIn = false;

      if (response.status == 1) {
        this.openSnackBar(response.message, 'Ok');
        localStorage.removeItem('token');
        localStorage.removeItem('expire');
        localStorage.removeItem('logintime');

        this.isLoggedIn = false;
        this.router.navigate(['/']);
      }
      else {
        this.openSnackBar(response.message, 'Ok');
      }
    }
    );

  }
  getCartData() {
    this.api.post('cart', '', this.header).subscribe((response: any) => {
      // console.log(response);
      if (response.status == 1) {
        this.productData = response.data;
        this.productLength = this.productData.length;
        // console.log(this.productLength);
        this.subtotal = 0;
        this.productData.forEach((product: any) => {
          this.subtotal += product.product.final_price * product.quantity;
          this.cartItem += product.quantity;
          // console.log(this.cartItem);
        });
      } else {
        // alert(response.message)
      }
      //  console.log(this.subtotal);   
    })
  }
  deleteCartItem(cartId: any) {
    console.log(cartId);
    const cartData = new FormData();
    cartData.append('cart_id', cartId);
    this.api.post('edit-cart', cartData, this.header).subscribe((response: any) => {
      console.log(response);
      this.getCartData();
      this.openSnackBar('item is deleted from cart','ok')
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
