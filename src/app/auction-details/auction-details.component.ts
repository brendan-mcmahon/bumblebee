import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auction } from '../models/auction';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.scss']
})
export class AuctionDetailsComponent implements OnInit {

  @Input() auction: Auction
  showAddItemDialog = false;
  showAddBidderDialog = false;

  constructor(private socketService: SocketService, private router: Router) { }

  ngOnInit(): void {
  }

  open(){
    this.socketService.openAuction(this.auction.id);
  }

  start() {
    this.router.navigate(['auctioneer/auction'])
  }

  toggleAddItemDialog(){
    this.showAddItemDialog = !this.showAddItemDialog;
  }

  toggleAddBidderDialog(){
    this.showAddBidderDialog = !this.showAddBidderDialog;
  }

  itemAdded($event) {
    this.auction.items.push($event);
  }

  bidderAdded($event) {
    this.auction.bidders.push($event);
  }
}
