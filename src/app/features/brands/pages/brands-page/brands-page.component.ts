import { BrandsService } from './../../services/brands.service';
import { Component, inject, OnInit } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-brands-page',
  imports: [SectionHeaderComponent, RouterLink],
  templateUrl: './brands-page.component.html',
  styleUrl: './brands-page.component.css',
})
export class BrandsPageComponent implements OnInit {
  public readonly brandsService = inject(BrandsService);

  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands(): void {
    this.brandsService.getAllBrands();
  }
}
