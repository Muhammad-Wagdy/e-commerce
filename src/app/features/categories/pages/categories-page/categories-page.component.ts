import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-categories-page',
  imports: [SectionHeaderComponent, LoadingSpinnerComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css',
})
export class CategoriesPageComponent implements OnInit {
  public readonly categoryService = inject(CategoriesService);

  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories(): void {
    this.categoryService.getAllCategories();
  }
}
