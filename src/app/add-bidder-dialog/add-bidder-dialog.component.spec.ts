import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBidderDialogComponent } from './add-bidder-dialog.component';

describe('AddBidderDialogComponent', () => {
  let component: AddBidderDialogComponent;
  let fixture: ComponentFixture<AddBidderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBidderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBidderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
