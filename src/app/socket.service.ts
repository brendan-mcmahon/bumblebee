import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Auction, Bid, Bidder, Item } from './models/auction';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  API_ENDPOINT = environment.API_ENDPOINT;
  private socket: any;
  message: string;
  auctionData$ = new BehaviorSubject<Auction[]>(null);
  selectedAuction$ = new BehaviorSubject<Auction>(null);
  newBid$ = new BehaviorSubject<Bid>(null);
  nextItemId$ = new BehaviorSubject<number>(null);

  constructor () {
    this.socket = io(this.API_ENDPOINT);

    this.socket.on('auction-data', (auctionData: Auction[]) => {
      this.auctionData$.next(auctionData);
    });

    this.socket.on('auction', (auction: Auction) => {
      console.log('got new auction info');
      console.log(auction);
      this.selectedAuction$.next(auction);
    });

    this.socket.on('new-bid', (auctionItem: Bid) => {
      this.newBid$.next(auctionItem);
    });

    this.socket.on('next-item', (auctionItemId: number) => {
      this.nextItemId$.next(auctionItemId);
    });
  }

  hey() {
    this.socket.emit('hey');
  }

  getAuctionDetails(auctionId: number) {
    this.socket.emit('auction-details', { auctionId });
  }

  auctionStarted(auctionId: number) {
    this.socket.emit('auction-started', { auctionId });
  }

  bid(id: number, bidderId: number, amount: number) {
    this.socket.emit('bid', { auctionItemId: id, bidderId, amount });
  }

  sold(auctionItemId: any, nextAuctionItemId = null) {
    this.socket.emit('sold', { auctionId: this.selectedAuction$.getValue().id, auctionItemId, nextAuctionItemId });
  }

  completeAuction(auctionId: number) {
    this.socket.emit('complete-auction', { auctionId });
  }

  joinRoom(auctionCode: string, name: string) {
    this.socket.emit('join', { code: auctionCode, name });
  }
}
