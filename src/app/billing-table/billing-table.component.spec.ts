import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingTableComponent } from './billing-table.component';

describe('BillingTableComponent', () => {
  let component: BillingTableComponent;
  let fixture: ComponentFixture<BillingTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingTableComponent]
    });
    fixture = TestBed.createComponent(BillingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
