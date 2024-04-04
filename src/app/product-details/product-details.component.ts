import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../services/general-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  carouselOptions: any = {
    loop: true,
    margin: 10,
    dots: false,
    nav: true,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 4,
      },
    },
  };
  productID: any;
  productDetailsData: any = {}
  showDescription = false;
  showVideo = false;
  showRating = true;
  counter: any = 0;
  attributeData: any;
  attributeDetails: any = {};
  productImage: any;
  parentCategoryName: any;
  categoryName: any;
  productImages: any;
  sizeFiltered: any = '';
  sizeFilterArr: any = [];
  uniqueId: any;
  size: any;
  i:any = 0;
  message: any;
  existingProducts:any=[];
  products:any={product_id:'',quantity:'',size:''};
  token:any;
  header:any;
  constructor(private api: GeneralServiceService, private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
    this.productID = +(this.route.snapshot.url[1].path);
    // console.log(typeof(this.productID));
    this.productDetails();
    this.token = localStorage.getItem('token'); 
    this.header = {
      headers: {
        "Authorization": "Bearer " + this.token,
      }
    }
  }
  productDetails() {
    const productData = new FormData();
    productData.append('productId', this.productID);
    productData.append('size', this.sizeFiltered);
    this.api.post('details', productData, '').subscribe((response: any) => {
      // console.log(response);
      this.productDetailsData = response.data;
      // console.log(response,'0000000000000000000000000');
      this.attributeDetails = response.attributeDetail;
      this.parentCategoryName = this.productDetailsData.category.parentcategory.category_name;
      this.categoryName = this.productDetailsData.category.category_name
      this.attributeData = this.productDetailsData.attributes;
      this.productImages = this.productDetailsData.images.small;
      // console.log(this.productImages);

      //  console.log(this.attributeData);
     
      // console.log(this.attributeDetails);
      
      // console.log(this.attributeDetails?.final_price);
      
      this.productImage = this.productDetailsData.images;
      // console.log(this.productImage);
      //  console.log(this.productDetailsData.images.small);
    }),
      (error: any) => {
        console.error('Error fetching image  data', error);
      }
  }
  // onFilterProductSize() {
   
  //   const sizeFilter = new FormData();
  //   sizeFilter.append('catId', this.productID)

  // }
  toggleContent(tab: string) {
    this.showDescription = tab === 'description';
    this.showVideo = tab === 'video';
    this.showRating = tab === 'rating';
  }
  count(type: any) {
    if(type == 'add'){
      this.counter++;
    }
    else if(type=='minus' && this.counter>1 ){
      this.counter--;
    } 
  }
  onsizeFilter(event: any,productId:any) {
    event.preventDefault();
    this.sizeFiltered = event.target.value;
    // console.log(this.sizeFiltered,'1111111111111111111111111');
    this.productDetails();
    // this.router.navigate(['/productdetails', productId], { queryParams: { size: this.sizeFiltered } });
  }
  unauthorizedAddToCart(): void {
    if (this.counter <= 0) {
      this.snackBar.open('Please add a quantity greater than 0.', 'Ok', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
      return; 
    }
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
      this.existingProducts[existingProductIndex].quantity += this.counter;
    } else {
      // If the product with the same size does not exist, add a new entry
    this.products = {
        'product_id': this.productID,
        'quantity': this.counter,
        'size': this.sizeFiltered,
      };
      this.existingProducts.push(this.products);
    }
  
    localStorage.setItem('products',JSON.stringify(this. existingProducts));

   const cartData = new FormData()
   cartData.append( 'cartProducts', JSON.stringify(this. existingProducts));
    this.api.post('add-to-cart', cartData,this.header).subscribe(
      (response: any) => {
        if(response.status ==1){
          console.log(response);
          this.message = response.isSaved[0];
          console.log(this.message);
          this.snackBar.open( 'sucessfully added', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
         
            window.location.reload();
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}
