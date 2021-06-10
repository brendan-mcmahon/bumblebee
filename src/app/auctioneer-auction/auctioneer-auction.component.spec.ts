import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctioneerAuctionComponent } from './auctioneer-auction.component';

describe('AuctioneerAuctionComponent', () => {
  let component: AuctioneerAuctionComponent;
  let fixture: ComponentFixture<AuctioneerAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctioneerAuctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctioneerAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
