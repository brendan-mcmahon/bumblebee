import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auction, Bidder, Item } from './models/auction';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/items`);
  }

  createNewItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}/items`, item);
  }

  createNewAuction(newAuction: Auction): Observable<Auction> {
    return this.http.post<Auction>(`${this.baseUrl}/auctions`, newAuction);
  }

  updateAuctionStatus(auctionId: number, status: string): Observable<Auction> {
    return this.http.put<Auction>(`${this.baseUrl}/auctions`, { auctionId, status });
  }

  addItemToAuction(itemId: number, auctionId: number): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}/auctions/item`, {itemId, auctionId});
  }

  removeItemFromAuction(auctionItemId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/auctions/item/${auctionItemId}`);
  }

  getAllBidders(): Observable<Bidder[]> {
    return this.http.get<Bidder[]>(`${this.baseUrl}/bidders`);
  }

  createNewBidder(bidder: Bidder): Observable<Bidder> {
    return this.http.post<Bidder>(`${this.baseUrl}/bidders`, bidder);
  }

  addBidderToAuction(bidderId: number, auctionId: number): Observable<Bidder> {
    return this.http.post<Bidder>(`${this.baseUrl}/auctions/bidder`, {bidderId, auctionId});
  }

  removeBidderFromAuction(auctionBidderId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/auctions/bidder/${auctionBidderId}`);
  }

  deleteAuction(auctionId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/auctions/${auctionId}`);
  }

}
