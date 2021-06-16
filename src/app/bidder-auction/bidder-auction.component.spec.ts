import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidderAuctionComponent } from './bidder-auction.component';

describe('BidderAuctionComponent', () => {
  let component: BidderAuctionComponent;
  let fixture: ComponentFixture<BidderAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidderAuctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidderAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
