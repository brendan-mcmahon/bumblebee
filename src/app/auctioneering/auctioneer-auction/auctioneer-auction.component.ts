import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auction, Bidder, Item } from '../../models/auction';
import { SocketService } from '../../socket.service';

@Component({
  selector: 'app-auctioneer-auction',
  templateUrl: './auctioneer-auction.component.html',
  styleUrls: ['./auctioneer-auction.component.scss']
})
export class AuctioneerAuctionComponent implements OnInit {
  auction: Auction;
  auctionFinished = false;
  currentItemIndex = 0;
  currentItem: Item;
  currentBidder: Bidder;
  round = 1;

  constructor (private socketService: SocketService, private router: Router) { }

  ngOnInit(): void {
    this.socketService.selectedAuction$.subscribe(auction => {
      if (!auction) this.router.navigate(['auctioneer']);
      console.log(auction);
      this.auction = auction
      this.currentItem = auction.items[this.currentItemIndex];
      this.currentItem.currentBid = this.currentItem.startingBid;
    });

    this.socketService.newBid$.subscribe(b => {
      if (!!b) {
        this.currentItem.currentBid = b.amount;
        this.currentBidder = this.auction.bidders.find(b2 => b2.bidderId === b.bidderId);
        this.round = 1;
      }
    })
  }

  increment() {
    if (this.round < 3) this.round++;
    else {
      this.sold();
    }
  }

  sold() {
    this.socketService.sold(this.currentItem.auctionItemId );
    if (this.currentItemIndex === this.auction.items.length - 1) {
      this.auctionFinished = true;
      this.socketService.completeAuction(this.auction.id);
    } else {
      this.socketService.sold(this.currentItem.auctionItemId, this.auction.items[this.currentItemIndex + 1].auctionItemId );
      this.currentItemIndex++;
      this.round = 1;
      this.currentItem = this.auction.items[this.currentItemIndex];
      this.currentItem.currentBid = this.currentItem.startingBid;
      this.currentBidder = null;
    }

    this.socketService.sold(this.currentItem.auctionItemId);
  }

  nextItem() {
    this.currentItemIndex++;
  }

  previousItem() {
    this.currentItemIndex--;
  }

  bid(amount: number, bidderId: number) {
    //is this id the auctionitem id or the item id?
    console.log(this.currentItem.auctionItemId);
    this.socketService.bid(this.currentItem.auctionItemId, bidderId, this.currentItem.currentBid + amount);
  }

  endAuction() { }

}
