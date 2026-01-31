import { Component, inject, afterNextRender, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CategoriesService } from '../../../categories/services/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categories-slider',
  imports: [CarouselModule, RouterLink],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.css',
})
export class CategoriesSliderComponent {
  public readonly categoryService = inject(CategoriesService);
  private readonly platformId = inject(PLATFORM_ID);

  showCarousel = false;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 800,
    mouseDrag: true,  // Enable for better UX
    touchDrag: true,  // Enable for mobile
    pullDrag: false,
    dots: false,
    nav: false,
    responsive: {
      0: { items: 2 },
      400: { items: 4 },
      740: { items: 6 },
      940: { items: 8 },
    }
  };

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.showCarousel = true;
      }
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(response => {
      this.categoryService.allCategories = response.data;
    });
  }
}
