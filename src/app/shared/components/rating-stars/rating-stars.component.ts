import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  imports: [],
  templateUrl: './rating-stars.component.html',
  styleUrl: './rating-stars.component.css',
})
export class RatingStarsComponent{
  @Input() ratingAverage: number = 0;
  @Input() ratingQuantity: number = 0;

  stars = [1, 2, 3, 4, 5];

  }

