import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ORDERS } from '../data/orders';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(OrdersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should get all orders', () => {
    service.getOrders().subscribe((orders) => {
      expect(orders).toBeTruthy();
      expect(orders.length).toBe(2);
      expect(orders[0].price).toEqual(ORDERS[0].price);
      expect(orders[1].price).toEqual(ORDERS[1].price);
    });
    const req = httpTestingController.expectOne('/selling-order-contracts');
    expect(req.request.method).toEqual('GET');
    req.flush({
      payload: ORDERS,
    });
  });

  it('should get an order by id', () => {
    const orderId = '2';
    const expectedOrder = ORDERS.find((order) => order.id === orderId);
    service.getOrderDetailsById(orderId).subscribe((order) => {
      expect(order).toBeTruthy();
      expect(order.id).toBe(orderId);
      expect(order.dishes).toBeTruthy();
      expect(order.dishes.length).toBe(expectedOrder.dishes.length);
      expect(order.dishes[0]).toBe(expectedOrder.dishes[0]);
      expect(order.dishes[1]).toBe(expectedOrder.dishes[1]);
      expect(order.price).toBe(expectedOrder.price);
    });
    const req = httpTestingController.expectOne(
      `/selling-order-contracts/${orderId}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush({
      payload: expectedOrder,
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
