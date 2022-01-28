import { Component } from '@angular/core';
@Component({
  selector: 'baskt-shop-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  carouselImages: string[] = [
    'assets/slide1.png',
    'assets/slide2.png',
    'assets/slide3.png',
  ];
  carouselHeadData: string[] = [
    'Use Smart Search Technology',
    'Add To Cart',
    'Checkout',
  ];

  carouselBodyData: string[] = [
    'Search by selecting a category or searching for the brand or product.',
    'Shop for a Wide Assortment of products at everyday low prices. New Products are added Daily.',
    'Confirm your haul and add more items.Tell us where and when to deliver.',
  ];
}
