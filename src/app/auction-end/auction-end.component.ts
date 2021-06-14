import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auction, Bidder } from '../models/auction';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-auction-end',
  templateUrl: './auction-end.component.html',
  styleUrls: ['./auction-end.component.scss']
})
export class AuctionEndComponent implements OnInit {
  auction: Auction;

  constructor (private socketService: SocketService, private router: Router) {
    if (!this.socketService.selectedAuction$.getValue()) {
      this.router.navigate(['auctioneer']);
    }
  }

  ngOnInit(): void {
    this.socketService.selectedAuction$.subscribe(a => this.auction = a)
  }

  getTotalForBidder(bidder: Bidder): number {
    return this.auction.items
      .where(i => i.bidder.bidderId === bidder.bidderId)
      .sum(i => i.currentBid);
  }
}
