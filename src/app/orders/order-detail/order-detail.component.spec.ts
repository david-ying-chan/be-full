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
      declarations: [OrderDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  // Story 1 AC 1 工序 1
  it('should display order detail', () => {
    const ORDER = ORDERS[0];
    component.data = ORDER;
    component.isOffline = false;
    fixture.detectChanges();

    const id = el.query(By.css('.id span'));
    expect(id.nativeElement.textContent).toBe(ORDER.id);

    const dishes = el.queryAll(By.css('.dishes li'));
    expect(dishes).toBeTruthy();
    expect(dishes.length).toBe(1);
    // 因为转化成 HTML 内容之后前后会多一个空格
    expect(dishes[0].nativeElement.textContent.trim()).toBe(ORDER.dishes[0]);

    const price = el.query(By.css('.price span'));
    expect(price.nativeElement.textContent).toBe(ORDER.price.toString());
  });

  // Story 1 AC 1 工序 1
  it('should trigger get ticket handler when click on getting ticket button of a done order', () => {
    const ORDER = ORDERS[0];
    component.data = ORDER;
    component.isOffline = false;
    component.finishPreparationHandler = jasmine.createSpy();
    component.getTicketHandler = jasmine.createSpy();
    fixture.detectChanges();

    const finishPreparationButton = el.query(By.css('.finish-preparation'));
    finishPreparationButton.nativeElement.click();
    expect(component.finishPreparationHandler).not.toHaveBeenCalled();

    const getTicketButton = el.query(By.css('.get-ticket'));
    getTicketButton.nativeElement.click();
    expect(component.getTicketHandler).toHaveBeenCalled();
  });

  // Story 1 AC 2 工序 1
  it('should not trigger get ticket handler when click on getting ticket button of a processing order', () => {
    const ORDER = ORDERS[1];
    component.data = ORDER;
    component.isOffline = false;
    component.finishPreparationHandler = jasmine.createSpy();
    component.getTicketHandler = jasmine.createSpy();
    fixture.detectChanges();

    const finishPreparationButton = el.query(By.css('.finish-preparation'));
    finishPreparationButton.nativeElement.click();
    expect(component.finishPreparationHandler).toHaveBeenCalled();

    const getTicketButton = el.query(By.css('.get-ticket'));
    getTicketButton.nativeElement.click();
    expect(component.getTicketHandler).not.toHaveBeenCalled();
  });

  // Story 1 AC 2 工序 1
  it('should not enable finish preparation button when it is offline', () => {
    const ORDER = ORDERS[1];
    component.data = ORDER;
    component.isOffline = true;
    component.finishPreparationHandler = jasmine.createSpy();
    component.getTicketHandler = jasmine.createSpy();
    fixture.detectChanges();

    const finishPreparationButton = el.query(By.css('.finish-preparation'));
    finishPreparationButton.nativeElement.click();
    expect(component.finishPreparationHandler).not.toHaveBeenCalled();
  });
});
