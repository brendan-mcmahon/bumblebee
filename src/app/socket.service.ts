import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Auction, Bid } from './models/auction';

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
  bidderId$ = new BehaviorSubject<number>(null);

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

    this.socket.on('bidder-id', (id: number) => {
      console.log(`new bidder id: ${id}`);
      this.bidderId$.next(id);
    })
  }

  auctioneer() {
    this.socket.emit('auctioneer');
  }

  auctioneerJoin() {
    this.socket.emit('auctioneer-join', { code: this.selectedAuction$.getValue().code });
  }

  getAuctionDetails(auctionId: number) {
    this.socket.emit('auction-details', { auctionId });
  }

  auctionStarted() {
    this.socket.emit('auction-started', { code: this.selectedAuction$.getValue().code });
  }

  bid(id: number, amount: number, bidderId: number = null) {
    this.socket.emit('bid', {
      code: this.selectedAuction$.getValue().code,
      auctionItemId: id,
      bidderId: bidderId || this.bidderId$.getValue(),
      amount });
  }

  sold(auctionItemId: any, nextAuctionItemId = null) {
    this.socket.emit('sold', { code: this.selectedAuction$.getValue().code, auctionId: this.selectedAuction$.getValue().id, auctionItemId, nextAuctionItemId });
  }

  completeAuction(auctionId: number) {
    this.socket.emit('complete-auction', { code: this.selectedAuction$.getValue().code, auctionId });
  }

  joinRoom(code: string, name: string) {
    this.socket.emit('join', { code, name });
  }

  rejoin(code: string, bidderId: number) {
    this.socket.emit('rejoin', { code, bidderId } )
  }

}
