import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { Auction, Bidder } from '../models/auction';

@Component({
  selector: 'app-add-bidder-dialog',
  templateUrl: './add-bidder-dialog.component.html',
  styleUrls: ['./add-bidder-dialog.component.scss']
})
export class AddBidderDialogComponent implements OnInit {
  @Input() auction: Auction;
  @Output() bidderAdded = new EventEmitter<Bidder>();
  allBidders: Bidder[];
  bidders: Bidder[];

  constructor (private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllBidders().subscribe(bidders => {
      this.allBidders = bidders;
      this.filterBidders();
    });
  }

  private filterBidders() {
    this.bidders = this.allBidders.filter(b => !this.auction.bidders.find(b2 => b2.id === b.id));
  }

  addBidder(bidder: Bidder) {
    this.apiService.addBidderToAuction(bidder.id, this.auction.id).subscribe(_ => {
      this.bidderAdded.emit(bidder);
      this.filterBidders();
    });
  }
}
