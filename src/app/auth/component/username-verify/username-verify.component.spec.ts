import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameVerifyComponent } from './username-verify.component';

describe('UsernameVerifyComponent', () => {
  let component: UsernameVerifyComponent;
  let fixture: ComponentFixture<UsernameVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsernameVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsernameVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
