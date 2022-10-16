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
  public orderId: string;
  public orderDetail: Order;
  public isOffline = false;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.orderId = params.get('id');
      this.getOrderDetailsById();
    });
  }

  getOrderDetailsById() {
    this.ordersService.getOrderDetailsById(this.orderId).subscribe(orderDetail => {
      this.orderDetail = orderDetail;
      if (this.orderDetail.done) {
        this.isOffline = false;
      }
    })
  }

  finishPreparation = () => {
    this.ordersService.finishPreparation(this.orderId).subscribe({
      next: () => {
        this.isOffline = false;
        this.getOrderDetailsById();
      },
      error: () => {
        this.isOffline = true;
        this.getOrderDetailsById();
      }
    });
  }

  getTicket = () => {
    this.ordersService.getTicket(this.orderId).subscribe();
  }
}
