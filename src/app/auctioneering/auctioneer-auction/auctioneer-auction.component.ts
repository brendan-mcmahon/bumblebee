import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auction, Bidder, Item } from '../../models/auction';
import { SocketService } from '../../socket.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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

  faTimes = faTimes;

  constructor (private socketService: SocketService, private router: Router) { }

  ngOnInit(): void {
    this.socketService.selectedAuction$.subscribe(auction => {
      if (!auction) this.router.navigate(['auctioneer']);

      // Probably shouldn't do this every time
      this.socketService.auctioneerJoin();
      this.auction = auction
      this.setCurrentItem();
      this.currentItem.currentBid = this.currentItem.currentBid || this.currentItem.startingBid;
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
    if (this.currentItemIndex === this.auction.items.length - 1) {
      this.auctionFinished = true;
      this.socketService.sold(this.currentItem.auctionItemId);
      this.socketService.completeAuction(this.auction.id);
      this.router.navigate(['auction/end'])
    } else {
      this.socketService.sold(this.currentItem.auctionItemId, this.auction.items[this.currentItemIndex + 1].auctionItemId);
      this.currentItemIndex++;
      this.auction.currentAuctionItemId = this.auction.items[this.currentItemIndex].auctionItemId;
      this.round = 1;
      this.setCurrentItem();
      this.currentItem.currentBid = this.currentItem.startingBid;
      this.currentBidder = null;
    }

  }

  private setCurrentItem() {
    this.currentItem = this.auction.items.find(i => i.auctionItemId === this.auction.currentAuctionItemId);
  }

  nextItem() {
    this.currentItemIndex++;
  }

  previousItem() {
    this.currentItemIndex--;
  }

  bid(amount: number, bidderId: number) {
    this.socketService.bid(this.currentItem.auctionItemId, this.currentItem.currentBid + amount, bidderId);
  }

  endAuction() { }

}
