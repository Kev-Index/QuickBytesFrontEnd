import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCartPageComponent } from './customer-cart-page.component';

describe('CustomerCartPageComponent', () => {
  let component: CustomerCartPageComponent;
  let fixture: ComponentFixture<CustomerCartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCartPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
