  import { Component,inject } from '@angular/core';
  import { CategoriesService } from '../../../categories/services/categories.service';
  import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
  import { getOwlOptions } from '../../../../core/utilities/owl-options.service';
  import { RouterLink } from "@angular/router";

  @Component({
    selector: 'app-categories-slider',
    imports: [CarouselModule, RouterLink],
    templateUrl: './categories-slider.component.html',
    styleUrl: './categories-slider.component.css',
  })
  export class CategoriesSliderComponent {
    public readonly categoryService = inject(CategoriesService);

    ngOnInit(): void {
      this.getAllCategories();
    }
    getAllCategories(): void {
      this.categoryService.getAllCategories().subscribe(response => {
        this.categoryService.allCategories = response.data;
      });
    }
    customOptions: OwlOptions = {
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      smartSpeed: 800,
      dots:false,
      responsive: {
        0: { items: 2 },
        400: { items: 4 },
        740: { items: 6 },
        940: { items: 8 },
      }
    };


  }
