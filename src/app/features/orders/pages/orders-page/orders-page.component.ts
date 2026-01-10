import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { DatePipe } from '@angular/common';
import { IAllOrdersResponse } from '../../interfaces/IAllOrdersResponse';

@Component({
  selector: 'app-orders-page',
  imports: [DatePipe],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css',
})
export class OrdersPageComponent implements OnInit{
  //injected services
  public readonly ordersService = inject(OrdersService)

  userOrders: IAllOrdersResponse[] = [];

  ngOnInit(): void {
    this.getUserOrders();
  }

  getUserOrders() {
    this.ordersService.getUserOrders().subscribe({
      next: (response) => {
        if (response) {
          this.userOrders = response.reverse();
        }
      },
      error: (err) => {
        console.error('Failed to load orders', err);
      },
    });
  }
}
