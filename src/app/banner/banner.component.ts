import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GeneralServiceService } from '../services/general-service.service';

interface BannerSlide {
  id: number;
  image: string;
  discount: string;
  link: string; 
  alt: string;
}


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  customOptions :any ={
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots:false,
  };

  slides:any=[] ;

  
  constructor(private api:GeneralServiceService) { }

  ngOnInit(): void {
    this.loadBannerData();
  }
  loadBannerData() {
    this.api.get('homepage','').subscribe(
      (data:any) => {
        this.slides = data.homeSliderBanners.map((banner:any) => {
          return {
            id: banner.id,
            image: banner.image,
            discount: banner.title, 
            link: banner.link,
            alt: banner.alt,
          };
        });
      },
      (error) => {
        console.error('Error fetching banner data', error);
      }
    );
  }

}
