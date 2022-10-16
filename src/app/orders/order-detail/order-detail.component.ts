import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input() data: Order;

  constructor() { }

  ngOnInit(): void {
  }

}
