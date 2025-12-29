import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { allProducts } from '../../../../core/interfaces/IAllProductsResponse';


@Component({
  selector: 'app-card-products',
  imports: [RouterLink],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.css',
})
export class CardProductsComponent {
  @Input({ required: true }) product!: allProducts;

  stars = [1,2,3,4,5]
}
