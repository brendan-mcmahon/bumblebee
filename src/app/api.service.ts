import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auction, Bidder, Item } from './models/auction';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:5000';
  // baseUrl = 'https://marital-bliss-api.herokuapp.com';

  constructor(private http: HttpClient, private router: Router) { }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/items`);
  }

  createNewItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}/items`, item);
  }

  createNewAuction(newAuction: Auction): Observable<Auction> {
    return this.http.post<Auction>(`${this.baseUrl}/auctions`, newAuction);
  }

  addItemToAuction(itemId: number, auctionId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auctions/item`, {itemId, auctionId});
  }

  getAllBidders(): Observable<Bidder[]> {
    return this.http.get<Bidder[]>(`${this.baseUrl}/bidders`);
  }

  createNewBidder(bidder: Bidder): Observable<Bidder> {
    return this.http.post<Bidder>(`${this.baseUrl}/bidders`, bidder);
  }

  addBidderToAuction(bidderId: number, auctionId: number): Observable<any> {
    console.log(`adding bidder ${bidderId} to auction ${auctionId}`);
    return this.http.post<any>(`${this.baseUrl}/auctions/bidder`, {bidderId, auctionId});
  }

}
