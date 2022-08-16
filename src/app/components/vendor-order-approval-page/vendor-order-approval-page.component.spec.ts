import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorOrderApprovalPageComponent } from './vendor-order-approval-page.component';

describe('VendorOrderApprovalPageComponent', () => {
  let component: VendorOrderApprovalPageComponent;
  let fixture: ComponentFixture<VendorOrderApprovalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorOrderApprovalPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorOrderApprovalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
