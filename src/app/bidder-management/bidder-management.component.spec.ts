import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidderManagementComponent } from './bidder-management.component';

describe('BidderManagementComponent', () => {
  let component: BidderManagementComponent;
  let fixture: ComponentFixture<BidderManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidderManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
