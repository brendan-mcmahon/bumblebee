import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Auction, Bidder, Item } from '../../models/auction';
import { SocketService } from '../../socket.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.scss']
})
export class AuctionDetailsComponent implements OnInit {

  @Input() auction: Auction
  @Output() close = new EventEmitter<any>();
  showAddItemDialog = false;
  showAddBidderDialog = false;
  faTrash = faTrash;
  inviteLink = environment.UI_URL;

  constructor(private socketService: SocketService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void { }

  start() {
    this.apiService.startAuction(this.auction.id).subscribe(auction => {
      this.socketService.selectedAuction$.next(auction);
      this.socketService.auctionStarted();
      this.router.navigate(['auctioneer/auction']);
    });
  }

  goToAuction(auction: Auction) {
    this.socketService.selectedAuction$.next(auction);
    this.router.navigate(['auctioneer/auction']);
  }

  viewEndSummary(auction: Auction) {
    this.socketService.selectedAuction$.next(auction);
    this.router.navigate(['auction/end']);
  }


  toggleAddItemDialog(){
    this.showAddItemDialog = !this.showAddItemDialog;
  }

  toggleAddBidderDialog(){
    this.showAddBidderDialog = !this.showAddBidderDialog;
  }

  itemAdded(newItem: Item) {
    console.log(newItem);
    if (!this.auction.items) this.auction.items = [];
    this.auction.items.push(newItem);
    console.log(this.auction.items);
  }

  itemRemoved(removedItem: Item) {
    this.auction.items = this.auction.items.where(i => i.itemId !== removedItem.itemId).toArray();
  }

  bidderAdded(newBidder: Bidder) {
    if (!this.auction.bidders) this.auction.bidders = [];
    this.auction.bidders.push(newBidder);
  }

  bidderRemoved(removedBidder: Bidder) {
    this.auction.items = this.auction.items.where(i => i.itemId !== removedBidder.bidderId).toArray();
  }

  deleteAuction(){
    this.apiService.deleteAuction(this.auction.id).subscribe(_ => {
      this.close.emit();
    })
  }

}
