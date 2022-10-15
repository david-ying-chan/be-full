import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() data: Order;

  constructor() { }

  ngOnInit(): void {
  }

  getLinkByOrderId(id: string): string {
    return `/orders/${id}`;
  }
}
