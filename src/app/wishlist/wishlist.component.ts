import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../services/general-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
token:any;
header:any;
wishlistDta:any=[];
wishlistId:any;
sizeFiltered: any = '';
sizeFilterArr: any = [];
existingProducts:any=[];
products:any={product_id:'',quantity:'',size:''};
productID:any;
message:any;
  constructor(private api:GeneralServiceService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.header = {
      headers: {
        "Authorization": "Bearer " + this.token,
      }
    }
     this.wishlistData();
  }
  wishlistData(){
    const showData = new FormData();
    showData.append('request_type','show');
    showData.append('request_from','web');
    this.api.post('wishlist',showData,this.header).subscribe((response:any)=>{
      // console.log(response);
      if(response.status == 1){
        this.wishlistDta = response.data;
        // console.log(this.wishlistData);
      }
      else{
        // alert(response);
      } 
    });
  }
  RemoveProduct(id:any){
    const removeData = new FormData();
    removeData.append('wishlist_id',id);
    removeData.append('request_type','remove');
    this.api.post('wishlist',removeData,this.header).subscribe((response:any)=>{
      // console.log(response);
      if(response.status ==1){
        this.wishlistData();
      }
    })
  }
  onsizeFilter(event:any,productId:any){
    event.preventDefault();
    this.sizeFiltered = event.target.value;
    // console.log(this.sizeFiltered);
    this.productID=productId;
  }
  addtoCart(){
    if (!this.sizeFiltered) {
      this.snackBar.open('Please select a size.', 'Ok', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
      return;
    }
    const existingProductIndex = this.existingProducts.findIndex(
      (product:any)=> product.size === this.sizeFiltered
    );
    if (existingProductIndex !== -1) {
      // If the product with the same size exists, update the quantity
      this.existingProducts[existingProductIndex].quantity += 1;
    } else {
      // If the product with the same size does not exist, add a new entry
    this.products = {
        'product_id': this.productID,
        'quantity': 1,
        'size': this.sizeFiltered,
      };
      this.existingProducts.push(this.products);
    }
    const cartData = new FormData()
   cartData.append( 'cartProducts', JSON.stringify(this. existingProducts));
    this.api.post('add-to-cart', cartData,this.header).subscribe(
      (response: any) => {
        if(response.status ==1){
          // console.log(response);
          this.message = response.isSaved[0];
          // console.log(this.message);
          this.snackBar.open( 'sucessfully added', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  
  }
  clearWishlist(){
    const clearData = new FormData();
    clearData .append('request_type','clear');
    this .api.post('wishlist',clearData,this.header).subscribe((response:any)=>{
      if(response.status ==1){
        this.wishlistData();
      }
    })
  }
}
