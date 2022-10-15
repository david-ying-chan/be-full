import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from './../../models/order';
import { OrdersService } from './../orders.service';

@Component({
  selector: 'app-order-detail-container',
  templateUrl: './order-detail-container.component.html',
  styleUrls: ['./order-detail-container.component.scss'],
})
export class OrderDetailContainerComponent implements OnInit {
  public orderDetail$: Observable<Order>;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const orderId = params.get('id');
      this.orderDetail$ = this.ordersService.getOrderDetailsById(orderId);
    });
  }
}
