import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ORDERS } from '../../data/orders';
import { OrdersModule } from '../orders.module';
import { OrdersService } from '../orders.service';
import { OrdersContainerComponent } from './orders-container.component';

describe('OrdersContainerComponent', () => {
  let component: OrdersContainerComponent;
  let fixture: ComponentFixture<OrdersContainerComponent>;
  let el: DebugElement;
  let ordersService: any;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    const ordersServiceSpy = jasmine.createSpyObj('OrdersService', [
      'getOrders',
    ]);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, OrdersModule],
      providers: [
        {
          provide: OrdersService,
          useValue: ordersServiceSpy,
        },
      ],
      declarations: [OrdersContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersContainerComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    ordersService = TestBed.inject(OrdersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // Story 2 AC 1&2 工序 2
  it('should set orders property when get orders', () => {
    ordersService.getOrders.and.returnValue(of(ORDERS));
    fixture.detectChanges();
    expect(component.orders).toEqual(ORDERS);
  });

  // Story 2 AC 3 工序 2
  it('should show offline message when get orders fails', async () => {
    ordersService.getOrders.and.returnValue(
      throwError(() => new Error('Network error.'))
    );
    fixture.detectChanges();
    const offlineHint = el.query(By.css('.offline-hint'));
    expect(offlineHint).toBeTruthy();
  });

  // Story 2 AC 3 工序 2
  it('should show previous orders when get orders fail', async () => {
    ordersService.getOrders.and.returnValue(of(ORDERS));
    fixture.detectChanges();

    ordersService.getOrders.and.returnValue(
      throwError(() => new Error('Network error.'))
    );
    fixture.detectChanges();

    expect(component.orders).toEqual(ORDERS);
  });

  // Story 2 AC 3 工序 2
  it('should hide offline message when get orders succeeds after fail', async () => {
    ordersService.getOrders.and.returnValue(
      throwError(() => new Error('Network error.'))
    );
    fixture.detectChanges();

    ordersService.getOrders.and.returnValue(of(ORDERS));
    const button = el.query(By.css('.get-orders'));
    button.nativeElement.click();
    fixture.detectChanges();

    const offlineHint = el.query(By.css('.offline-hint'));
    expect(offlineHint).toBeFalsy();
  });
});
