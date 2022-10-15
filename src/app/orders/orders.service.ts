import { ORDERS } from './../data/orders';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Order } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    // return this.http.get<{ payload: Order[] }>('/selling-order-contracts').pipe(
    //   map(res => res.payload)
    // );

    return of(ORDERS);
  }

  getOrderDetails(id: string): Observable<Order> {
    // return this.http.get<{ payload: Order }>(`/selling-order-contracts/${id}`).pipe(
    //   map(res => res.payload)
    // );

    return of(ORDERS.find(order => order.id === id));
  }
}
