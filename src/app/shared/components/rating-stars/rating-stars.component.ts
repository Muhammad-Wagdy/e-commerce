import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  imports: [],
  templateUrl: './rating-stars.component.html',
  styleUrl: './rating-stars.component.css',
})
export class RatingStarsComponent{
  @Input() ratingAverage = 0;
  @Input() ratingQuantity = 0;

  stars = [1, 2, 3, 4, 5];


  }

