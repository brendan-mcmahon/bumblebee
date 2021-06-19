import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Auction, Bidder } from '../../models/auction';
import { SocketService } from '../../socket.service';

@Component({
  selector: 'app-auction-end',
  templateUrl: './auction-end.component.html',
  styleUrls: ['./auction-end.component.scss']
})
export class AuctionEndComponent implements OnInit {
  auction: Auction;
  bidderId: number;
  bidderTotal: number;

  constructor (private socketService: SocketService, private router: Router, public dataService: DataService) {
  }

  ngOnInit(): void {

    if (!this.socketService.selectedAuction$.getValue()) {
      this.router.navigate(['']);
    }
    this.socketService.selectedAuction$.subscribe(a => {
       this.auction = a;
       if (this.dataService.userType === 'bidder') {
        this.bidderId = this.socketService.bidderId$.getValue();
        this.bidderTotal = this.getTotalForBidder(this.bidderId);
      }
    })
  }

  getTotalForBidder(bidderId: number): number {
    return this.auction.items
      .where(i => i.bidder.bidderId === bidderId)
      .sum(i => i.currentBid);
  }

  getItemsForBidder() {
    return this.auction.items
      .where(i => i.bidder.bidderId === this.bidderId);
  }
}
