import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrdersModule } from './../orders.module';

import { OrderDetailContainerComponent } from './order-detail-container.component';

describe('OrderDetailContainerComponent', () => {
  let component: OrderDetailContainerComponent;
  let fixture: ComponentFixture<OrderDetailContainerComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, OrdersModule],
      declarations: [OrderDetailContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDetailContainerComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
