import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Auction, Bid, Item } from './models/auction';

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


  constructor() {
    this.socket = io(this.SOCKET_ENDPOINT);

    this.socket.on('auction-data', (auctionData: Auction[]) => {
      this.auctionData$.next(auctionData);
    });

    this.socket.on('auction', (auction: Auction) => {
      console.log(auction);
      this.selectedAuction$.next(auction);
    });

    this.socket.on('new-bid', (auctionItem: Bid) => {
      this.newBid$.next(auctionItem);
    })
   }

   hey() {
    this.socket.emit('hey');
  }

  openAuction(auctionId: number) {
    this.socket.emit('open-auction', { auctionId });
  }

  getAuctionDetails(auctionId: number) {
    this.socket.emit('auction-details', { auctionId });
  }

  bid(id: number, bidderId: number, amount: number) {
    this.socket.emit('bid', { auctionItemId: id, bidderId, amount });
  }
}
