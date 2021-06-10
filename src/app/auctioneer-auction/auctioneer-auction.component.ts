import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auction, Bidder, Item } from '../models/auction';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-auctioneer-auction',
  templateUrl: './auctioneer-auction.component.html',
  styleUrls: ['./auctioneer-auction.component.scss']
})
export class AuctioneerAuctionComponent implements OnInit {
  auction: Auction;
  currentItemIndex = 0;
  currentItem: Item;
  currentBidder: Bidder;
  round = 1;

  constructor (private socketService: SocketService, private router: Router) { }

  ngOnInit(): void {
    if (!this.socketService.selectedAuction$.getValue()) {
      this.router.navigate(['auctioneer']);
    }

    this.socketService.selectedAuction$.subscribe(auction => {
      this.auction = auction
      this.currentItem = auction.items[this.currentItemIndex];
      this.currentItem.currentBid = this.currentItem.startingBid;
    });

    this.socketService.newBid$.subscribe(b => {
      console.log(b);
      console.log(this.currentItem);
      if (!!b) {
        this.currentItem.currentBid = b.amount;
        this.currentItem.currentBidderId = b.bidderId;
        this.currentBidder = this.auction.bidders.find(b => b.id === this.currentItem.currentBidderId);
        this.round = 1;
      }
    })
  }

  increment() {
    if (this.round < 3) this.round++;
    else {
      this.currentItemIndex++;
      this.round = 1;
    }
  }

  nextItem() {
    this.currentItemIndex++;
  }

  previousItem() {
    this.currentItemIndex--;
  }

  bid(amount: number, bidderId: number) {
    //is this id the auctionitem id or the item id?
    this.socketService.bid(this.currentItem.id, bidderId, this.currentItem.currentBid + amount);
  }

  endAuction() { }

}
