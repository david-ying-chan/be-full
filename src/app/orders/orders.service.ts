import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Order } from '../models/order';
import { ORDERS } from './../data/orders';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private _isOffline$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isOffline$ = this._isOffline$$ as Observable<boolean>;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http
      .get<{ payload: Order[] }>('/selling-order-contracts')
      .pipe(map((res) => res.payload));

    // return of(ORDERS);
  }

  getOrderDetailsById(id: string): Observable<Order> {
    return this.http.get<{ payload: Order }>(`/selling-order-contracts/${id}`).pipe(
      map(res => res.payload)
    );

    // return of(ORDERS.find((order) => order.id === id));
  }
}
