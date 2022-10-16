import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ORDERS } from 'src/app/data/orders';
import { OrderListComponent } from './order-list.component';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [OrderListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  // Story 2 AC 1 工序 1
  it('should display orders', () => {
    component.orders = ORDERS;
    fixture.detectChanges();

    const orders = el.queryAll(By.css('.order-card'));
    expect(orders).toBeTruthy();
    expect(orders.length).toBe(2);
  });

  // Story 2 AC 1 工序 1
  it('should display specific order card', () => {
    component.orders = ORDERS;
    fixture.detectChanges();

    const ORDER = ORDERS[0];
    const order = el.query(By.css('.order-card:first-child'));

    const id = order.query(By.css('.id span'));
    expect(id.nativeElement.textContent).toBe(ORDER.id);

    const dishes = order.queryAll(By.css('.dishes li'));
    expect(dishes).toBeTruthy();
    expect(dishes.length).toBe(1);
    // 因为转化成 HTML 内容之后前后会多一个空格
    expect(dishes[0].nativeElement.textContent.trim()).toBe(ORDER.dishes[0]);

    const price = order.query(By.css('.price span'));
    expect(price.nativeElement.textContent).toBe(ORDER.price.toString());
  });

  // Story 2 AC 2 工序 1
  it('should show no orders message when there are no orders', () => {
    component.orders = [];
    fixture.detectChanges();

    const emptyContent = el.query(By.css('.empty'));
    expect(emptyContent).toBeTruthy();
    expect(emptyContent.nativeElement.textContent.trim()).toBe(
      '目前没有订单。'
    );
  });
});
