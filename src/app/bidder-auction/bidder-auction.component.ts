import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auction, Item } from '../models/auction';
import { SocketService } from '../socket.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-bidder-auction',
  templateUrl: './bidder-auction.component.html',
  styleUrls: ['./bidder-auction.component.scss']
})
export class BidderAuctionComponent implements OnInit {
  auction: Auction;
  currentItem: Item;

  constructor (private socketService: SocketService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.socketService.selectedAuction$.subscribe(auction => {
      if (!!auction) {
        if (auction.status === 'complete') {
          this.router.navigate(['auction/end']);
        }
        this.auction = auction;
        this.setCurrentItem();
        this.socketService.bidderId$.subscribe(id => {
          if (!!id) {
            const bidder = this.auction.bidders.find(b => b.bidderId === id);
            this.storageService.setConfig({
              userId: id,
              userName: bidder.name,
              auctionCode: this.auction.code
            });
          }
        });
      }
    });
  }

  bid(amount: number) {
    this.socketService.bid(this.currentItem.auctionItemId, this.currentItem.currentBid + amount);
  }

  private setCurrentItem() {
    this.currentItem = this.auction.items.find(i => i.auctionItemId === this.auction.currentAuctionItemId);
  }
}
