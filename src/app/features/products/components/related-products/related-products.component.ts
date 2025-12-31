import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { SectionHeaderComponent } from "../../../../shared/components/section-header/section-header.component";
import { LoadingSpinnerComponent } from "../../../../shared/components/loading-spinner/loading-spinner.component";
import { CardProductsComponent } from "../card-products/card-products.component";

@Component({
  selector: 'app-related-products',
  imports: [SectionHeaderComponent, LoadingSpinnerComponent, CardProductsComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css',
})
export class RelatedProductsComponent implements OnInit {
  public readonly productsService = inject(ProductsService);
  public readonly router = inject(Router)
  public readonly activatedRoute = inject(ActivatedRoute)
  public readonly viewportScroller = inject(ViewportScroller)

  page = 1
  limit = 8

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params =>{
      this.page = +params['id'] || 1;
      this.getAllProducts();

    })
  }
  getAllProducts() : void {
    this.productsService.getAllProducts(this.page,this.limit)
  }

}
