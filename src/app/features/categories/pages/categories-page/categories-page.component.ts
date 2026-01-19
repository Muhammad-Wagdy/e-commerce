import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { RouterLink } from "@angular/router";
import { SkeletonLoaderComponent } from "../../../../shared/components/skeleton-loader/skeleton-loader/skeleton-loader.component";
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-categories-page',
  imports: [SectionHeaderComponent, RouterLink, SkeletonLoaderComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css',
})
export class CategoriesPageComponent implements OnInit {
  public readonly categoryService = inject(CategoriesService);
  public readonly viewportScroller = inject(ViewportScroller);


  limit = 8

  ngOnInit(): void {
    this.getAllCategories();
    this.viewportScroller.scrollToPosition([0,0]  ,{
      behavior:'smooth'
    })
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories()      .subscribe({
        next: (response) => {
          this.categoryService.allCategories = response.data;
        },
        error: (error) => {
          console.error('Error fetching categories:', error);
        },
      });;
  }
}
