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
    this.socketService.selectedAuction$.subscribe(auction => this.auction = auction);
    this.socketService.nextItemId$.subscribe(id => {
      if (id) {
        this.auction.currentAuctionItemId = id;
        this.setCurrentItem();
      }
    });

    this.setCurrentItem();
  }

  private setCurrentItem() {
    this.currentItem = this.auction.items.find(i => i.auctionItemId === this.auction.currentAuctionItemId);
  }
}
