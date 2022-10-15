import { Order } from './../../models/order';
import { OrdersService } from './../orders.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-order-detail-container',
  templateUrl: './order-detail-container.component.html',
  styleUrls: ['./order-detail-container.component.scss']
})
export class OrderDetailContainerComponent implements OnInit {
  public orderDetail$: Observable<Order>;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const orderId = params.get('id');
      this.orderDetail$ = this.ordersService.getOrderDetails(orderId);
    })
  }
}
