import { BrandsService } from './../../services/brands.service';
import { Component, inject, OnInit } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { RouterLink } from "@angular/router";
import { SkeletonLoaderComponent } from "../../../../shared/components/skeleton-loader/skeleton-loader/skeleton-loader.component";
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-brands-page',
  imports: [SectionHeaderComponent, RouterLink, SkeletonLoaderComponent],
  templateUrl: './brands-page.component.html',
  styleUrl: './brands-page.component.css',
})
export class BrandsPageComponent implements OnInit {
  public readonly brandsService = inject(BrandsService);
  private readonly viewportScroller = inject(ViewportScroller);

  ngOnInit(): void {
    this.getAllBrands();
    this.viewportScroller.scrollToPosition([0,0],{
      behavior:'smooth'
    })
  }
  getAllBrands(): void {
    this.brandsService.getAllBrands();
  }
}
