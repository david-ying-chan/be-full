import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ORDERS } from 'src/app/data/orders';

import { OrderDetailComponent } from './order-detail.component';

describe('OrderDetailComponent', () => {
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should display order detail', () => {
    const ORDER = ORDERS[1];
    component.data = ORDER;
    fixture.detectChanges();

    const id = el.query(By.css('.id span'));
    expect(id.nativeElement.textContent).toBe(ORDER.id);

    const dishes = el.queryAll(By.css('.dishes li'));
    expect(dishes.length).toBe(2);
    // 因为转化成 HTML 内容之后前后会多一个空格
    expect(dishes[0].nativeElement.textContent.trim()).toBe(ORDER.dishes[0]);
    expect(dishes[1].nativeElement.textContent.trim()).toBe(ORDER.dishes[1]);

    const price = el.query(By.css('.price span'));
    expect(price.nativeElement.textContent).toBe(ORDER.price.toString());
  });
});
