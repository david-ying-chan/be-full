import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
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

  // Story 2 AC 1 工序 3
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

  // Story 2 AC 2 工序 3
  it('should get no orders if there are no orders', () => {
    service.getOrders().subscribe((orders) => {
      expect(orders).toEqual([]);
    });
    const req = httpTestingController.expectOne('/selling-order-contracts');
    expect(req.request.method).toEqual('GET');
    req.flush({
      payload: [],
    });
  });

  // Story 2 AC 3 工序 3
  it('should get error if getting orders fails', () => {
    service.getOrders().subscribe({
      next: () => {
        fail();
      },
      error: (error: HttpErrorResponse) => {
        expect(error).toBeTruthy();
      },
    });
    const req = httpTestingController.expectOne('/selling-order-contracts');
    expect(req.request.method).toEqual('GET');
    req.error(new ErrorEvent('Network error.'));
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

  // Story 1 AC 1 工序 3
  it('should finish preparation', () => {
    const orderId = '2';
    service.finishPreparation(orderId).subscribe(() => {});
    const req = httpTestingController.expectOne(
      `/selling-order-contracts/${orderId}/preparation/confirmation`
    );
    expect(req.request.method).toEqual('POST');
    req.flush({});
  });

  // Story 1 AC 2 工序 3
  it('should retry 2 more times if finish preparation fails', () => {
    const orderId = '2';
    service.finishPreparation(orderId).subscribe({
      next: () => {},
      error: () => {}
    });
    let req: TestRequest;
    for (let i = 0; i < 3; i++) {
      req = httpTestingController.expectOne(
        `/selling-order-contracts/${orderId}/preparation/confirmation`
      );
      expect(req.request.method).toEqual('POST');
      req.error(new ErrorEvent('Network error.'));
    }
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
