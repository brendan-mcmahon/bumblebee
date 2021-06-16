import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../../api.service';
import { Auction, Bidder } from '../../models/auction';

@Component({
  selector: 'app-add-bidder-dialog',
  templateUrl: './add-bidder-dialog.component.html',
  styleUrls: ['./add-bidder-dialog.component.scss']
})
export class AddBidderDialogComponent implements OnInit, OnChanges {
  @Input() auction: Auction;
  @Output() bidderAdded = new EventEmitter<Bidder>();
  @Output() bidderRemoved = new EventEmitter<Bidder>();
  @Output() close = new EventEmitter<any>();
  allBidders: Bidder[];
  unusedBidders: Bidder[];

  constructor (private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllBidders().subscribe(bidders => {
      this.allBidders = bidders;
      this.filterBidders();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.apiService.getAllBidders().subscribe(bidders => {
      this.allBidders = bidders;
      this.filterBidders();
    });
  }

  private filterBidders() {
    if (!this.auction.bidders) this.unusedBidders = [...this.allBidders];
    else {
      this.unusedBidders = this.allBidders.filter(b => !this.auction.bidders.find(b2 => b2.bidderId === b.bidderId));
    }
  }

  addBidder(bidder: Bidder) {
    this.apiService.addBidderToAuction(bidder.bidderId, this.auction.id).subscribe((newBidder: Bidder) => {
      this.bidderAdded.emit(newBidder);
      this.filterBidders();
    });
  }

  removeBidder(bidder: Bidder) {
    this.apiService.removeItemFromAuction(bidder.auctionBidderId).subscribe(_ => {
      this.bidderRemoved.emit(bidder);
      this.filterBidders();
    });
  }
}
