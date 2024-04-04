import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralServiceService } from '../services/general-service.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  productID: any;
  singleProdData: any;
  categoryDetails: any;
  categorydata: any;
  sizeDetails: any;
  filterData: any;
  brand: any;
  colorDetails: any;
  fabricDetails: any;
  fitDetails: any;
  brandName: any;
  isColorDivVisible: boolean = true;
  isCategoryDivVisible: boolean = true;
  isBrandDivVisible: boolean = true;
  isSizeDivVisible: boolean = true;
  isSubCategoryDivVisible: boolean = true;
  isFitDivVisible: boolean = true;
  isFabricDivVisible: boolean = true;
  isSubSubCategoryDiv: boolean = true;
  filters: any = {};
  sizeFiltered: any;
  brandFiltered: any;
  colorFiltered: any;
  fabricFiltered: any;
  fitFiltered: any;
  sizeFilterArr: any = [];
  brandFilterArr: any = [];
  colorFilterArr: any = [];
  fabricFilterdArr: any = [];
  fitFilteredArr: any = [];
  isGridView = true;
  islistView: boolean = false;
  id: any;
  size: any = [];
  token: any;
  header: any;

  constructor(private api: GeneralServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.header = {
      headers: {
        "Authorization": "Bearer " + this.token,
      }
    }
    this.productID = this.route.snapshot.url[1].path;
    // console.log(this.productID);
    this.ListingProductData();
    this.ListingFilterData();
    this.CategoryData();

  }
  ListingProductData() {
    const filterData = new FormData();
    filterData.append('catId', this.productID);
    filterData.append('color', JSON.stringify(this.colorFilterArr));
    filterData.append('fabric', JSON.stringify(this.fabricFilterdArr));
    filterData.append('brand', JSON.stringify(this.brandFilterArr));
    filterData.append('size', JSON.stringify(this.sizeFilterArr));
    filterData.append('fit', JSON.stringify(this.fitFilteredArr));
    filterData.append('request_from', 'web');
    this.api.post('listing', filterData, '').subscribe((result: any) => {
      // console.log(result);
      this.singleProdData = result.data;
      // console.log(this.singleProdData);
    })
  }
  ListingFilterData() {
    const filterData = new FormData();
    filterData.append('catId', this.productID);
    this.api.post('filters', filterData, '').subscribe((result: any) => {
      // console.log(result.filters);
      this.filterData = result.filters;
      this.brand = result.brandfilter.data;
      // console.log(this.brand);
      this.sizeDetails = this.filterData[6].data;
      // console.log(this.sizeDetails);

      this.colorDetails = this.filterData[0].data;
      this.fabricDetails = this.filterData[1].data;
      this.fitDetails = this.filterData[4].data;
    })
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
  toggleColorCollapse(): void {
    this.isColorDivVisible = !this.isColorDivVisible;
  }
  toggleBrandCollapse(): void {
    this.isBrandDivVisible = !this.isBrandDivVisible;
  }
  toggleSizeCollapse(): void {
    this.isSizeDivVisible = !this.isSizeDivVisible;
  }
  toggleFabricCollapse(): void {
    this.isFabricDivVisible = !this.isFabricDivVisible;
  }
  toggleFitCollapse() {
    this.isFitDivVisible = !this.isFitDivVisible;
  }
  toggleCategoryCollapse() {
    this.isCategoryDivVisible = !this.isCategoryDivVisible;
  }
  toggleSubCategoryCollapse() {
    this.isSubCategoryDivVisible = !this.isSubCategoryDivVisible;
  }
  toggleSubSubCategoryCollapse() {
    this.isSubSubCategoryDiv = !this.isSubSubCategoryDiv;
  }

  onchangeFilterSize(event: any, index: any) {
    this.sizeFiltered = event.target.value;
    if (event.target.checked) {
      this.sizeFilterArr.push(this.sizeFiltered);
      // console.log(this.sizeFilterArr);
    } else if (event.target.checked == false) {
      this.sizeFilterArr.splice(index, 1);
      // console.log(this.sizeFilterArr);
    }
    this.ListingProductData();
  }

  onchangeFilterBrand(event: any, id: any, index: any) {
    this.brandFiltered = id;
    if (event.target.checked) {
      this.brandFilterArr.push(this.brandFiltered);
      // console.log(this.brandFilterArr);
    } else if (event.target.checked == false) {
      this.brandFilterArr.splice(index, 1);
      // console.log(this.brandFilterArr);
    }
    this.ListingProductData();
  }
  onchangeFilterColor(event: any, index: any) {
    this.colorFiltered = event.target.value;
    if (event.target.checked) {
      this.colorFilterArr.push(this.colorFiltered);
      // console.log(this.colorFilterArr);
    } else if (event.target.checked == false) {
      this.colorFilterArr.splice(index, 1);
      // console.log(this.colorFilterArr);
    }
    this.ListingProductData();
  }
  onchangeFilterFabric(event: any, index: any) {
    this.fabricFiltered = event.target.value;
    if (event.target.checked) {
      this.fabricFilterdArr.push(this.fabricFiltered);
      // console.log(this.fabricFilterdArr);
    } else if (event.target.checked == false) {
      this.fabricFilterdArr.splice(index, 1);
      // console.log(this.fabricFilterdArr);
    }
    this.ListingProductData();
  }
  onchangeFilterFit(event: any, index: any) {
    this.fitFiltered = event.target.value;
    if (event.target.checked) {
      if (!this.fitFilteredArr.includes(this.fitFiltered)) {
        this.fitFilteredArr.push(this.fitFiltered);
        // console.log(this.fitFilteredArr);
      }
    } else if (event.target.checked == false) {
      this.fitFilteredArr.splice(index, 1);
      // console.log(this.fitFilteredArr);
    }
    this.ListingProductData();
  }
  GridView() {
    this.isGridView = true;
    this.islistView = false;
  }
  ListView() {
    this.isGridView = false;
    this.islistView = true;
  }

  addToWishlist(product: any) {
    // console.log(id);
    // console.log('sizes/' + id);
    this.id = product.id;
    this.size = product.sizes;
    const sizeData = new FormData();
    sizeData.append('product_id', this.id);
    sizeData.append('size', JSON.stringify(this.size));
    sizeData.append('request_type', 'add');
    this.api.post('wishlist', sizeData, this.header).subscribe((response: any) => {
      // console.log(response);
    })
  }

}


