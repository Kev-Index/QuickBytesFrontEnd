import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComboComponent } from './item-combo.component';

describe('ItemComboComponent', () => {
  let component: ItemComboComponent;
  let fixture: ComponentFixture<ItemComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemComboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
