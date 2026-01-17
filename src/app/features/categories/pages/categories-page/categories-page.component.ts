import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { RouterLink } from "@angular/router";
import { SkeletonLoaderComponent } from "../../../../shared/components/skeleton-loader/skeleton-loader/skeleton-loader.component";

@Component({
  selector: 'app-categories-page',
  imports: [SectionHeaderComponent, RouterLink, SkeletonLoaderComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css',
})
export class CategoriesPageComponent implements OnInit {
  public readonly categoryService = inject(CategoriesService);

  limit = 8

  ngOnInit(): void {
    this.getAllCategories();
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
