import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestComboComponent } from './request-combo.component';

describe('RequestComboComponent', () => {
  let component: RequestComboComponent;
  let fixture: ComponentFixture<RequestComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestComboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
