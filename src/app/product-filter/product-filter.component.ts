import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../services/general-service.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  newArrivals: any[] = [];
  showProductList = false;
  category: any[] = [];
  selectedCategory: string = 'ALL';
  filteredCategory: any;
  types: any;
  selectedCategoryData: any;
  activeCategory:any;
  id:any;
  size:any=[];
  token:any;
  header:any;
  selectedtab :any ='all';
  
  constructor(private api: GeneralServiceService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.header = {
      headers: {
        "Authorization": "Bearer " + this.token,
      }
    }
    this.loadProdutsData();
  }

  loadProdutsData(): void {
    this.api.get('products','').subscribe(
      (data: any) => {
        if(data.status ==1){
          this.category = data.data;
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }



  filterProducts(category: string): void {
    // this.selectedCategory = category;
    // console.log(this.selectedCategory);


    this.selectedCategoryData = this.category.find(item => item.type === category);
    this.activeCategory = this.selectedCategoryData;
    // console.log(this.activeCategory);
    

    if (this.selectedCategoryData) {

      // console.log('Selected Category Data:', this.selectedCategoryData);

    } else {
      console.error('Selected category data not found.');
    }
  }
  addToWishlist(product:any){
    // console.log(id);
    // console.log('sizes/' + id);
    this.id = product.id;
    this.size = product.sizes;
    const sizeData = new FormData();
    sizeData.append('product_id',this.id);
    sizeData.append('size',JSON.stringify(this. size));
    sizeData.append('request_type','add');


    
    this.api.post('wishlist' ,sizeData,this.header).subscribe((response:any)=>{
    // console.log(response);
  
    })
  }
  

  

}
