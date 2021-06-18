import { Component, OnInit } from '@angular/core';
import { Auction, Item } from '../models/auction';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-bidder-auction',
  templateUrl: './bidder-auction.component.html',
  styleUrls: ['./bidder-auction.component.scss']
})
export class BidderAuctionComponent implements OnInit {
  auction: Auction;
  currentItem: Item;

  constructor (private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.selectedAuction$.subscribe(auction => {
      console.log('auction updated');
      console.log(auction.status);
      this.auction = auction;
      this.setCurrentItem();
    });
    // this.socketService.nextItemId$.subscribe(id => {
    //   console.log(`new item id up ${id}`);
    //   if (id) {
    //     this.auction.currentAuctionItemId = id;
    //     this.setCurrentItem();
    //   }
    // });

  }

  bid(amount: number) {
    this.socketService.bid(this.currentItem.auctionItemId, this.currentItem.currentBid + amount);
  }

  private setCurrentItem() {
    this.currentItem = this.auction.items.find(i => i.auctionItemId === this.auction.currentAuctionItemId);
  }
}
