import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
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
      imports: [HttpClientTestingModule],
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

  // Story 1 AC 2 工序 2
  it('should show no orders message when there are no orders', () => {
    ordersService.getOrders.and.returnValue(of([]));
    fixture.detectChanges();

    const emptyContent = el.query(By.css('.empty'));
    expect(emptyContent).toBeTruthy();
    expect(emptyContent.nativeElement.textContent.trim()).toBe(
      '目前没有订单。'
    );
  });
});
