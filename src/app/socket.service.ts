import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Auction, Bid, Bidder, Item } from './models/auction';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  SOCKET_ENDPOINT = environment.SOCKET_ENDPOINT;
  private socket: any;
  message: string;
  auctionData$ = new BehaviorSubject<Auction[]>(null);
selectedAuction$ = new BehaviorSubject<Auction>(null);
  newBid$ = new BehaviorSubject<Bid>(null);
  itemSold$ = new BehaviorSubject<Item>(null);

  constructor() {
    this.socket = io(this.SOCKET_ENDPOINT);

    this.socket.on('auction-data', (auctionData: Auction[]) => {
      this.auctionData$.next(auctionData);
    });

    this.socket.on('auction', (auction: Auction) => {
      this.selectedAuction$.next(auction);
    });

    this.socket.on('new-bid', (auctionItem: Bid) => {
      this.newBid$.next(auctionItem);
    });

    this.socket.on('sell-complete', (auctionItem: Item) => {
      this.itemSold$.next(auctionItem);
    })
   }

   hey() {
    this.socket.emit('hey');
  }

  getAuctionDetails(auctionId: number) {
    this.socket.emit('auction-details', { auctionId });
  }

  bid(id: number, bidderId: number, amount: number) {
    this.socket.emit('bid', { auctionItemId: id, bidderId, amount });
  }

  sold(auctionItemId: any) {
    this.socket.emit('sold', { auctionItemId });
  }

  completeAuction(auctionId: number) {
    this.socket.emit('complete-auction', { auctionId });
  }

}
