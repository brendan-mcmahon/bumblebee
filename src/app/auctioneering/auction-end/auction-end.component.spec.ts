import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionEndComponent } from './auction-end.component';

describe('AuctionEndComponent', () => {
  let component: AuctionEndComponent;
  let fixture: ComponentFixture<AuctionEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionEndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
