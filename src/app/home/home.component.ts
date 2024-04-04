import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../services/general-service.service';

interface BannerImage {
  id: number;
  image: string;
  title: string;
  link: string; 
  alt: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  carouselOptions:any  = {
    loop: true,
    margin: 10,
    dots:false,
    nav: true,
    navSpeed:700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  };

  images: BannerImage[] = [];
  collectionBanners: any[] = [];
  category:any;
  arrivalData:any;
  feauturedData:any;
  newfeauturedData:any
  newarrivalData:any;
  constructor(private api:GeneralServiceService) { }

  ngOnInit(): void {
   this.homeFixBannersData();
   this.ProductsData();
   
    
  }
  homeFixBannersData() {
    this.api.get('homepage','').subscribe(
      (data:any) => {
        this.collectionBanners = data.homeFixBanners;
        // console.log(this.collectionBanners);
        
      },
      (error) => {
        console.error('Error fetching image  data', error);
      }
    );
  }
  ProductsData(){
    this.api.get('products','').subscribe(
      (data: any) => {
        // console.log('API Response:', data);
        this.category = data.data;
        this.arrivalData = this.category.find((item:any) => item.type === 'newArrivals');
        this.newarrivalData=this.arrivalData.data;
        //  console.log(this.arrivalData);
        
        this.feauturedData = this.category.find((item:any) => item.type === 'feautured');
       this.newfeauturedData=this.feauturedData.data;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  

}
