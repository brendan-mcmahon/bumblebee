import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { SocketService } from '../socket.service';
import { Auction } from 'c:/Users/Brendan.McMahon/code/bumblebee/src/app/models/auction';

@Component({
  selector: 'app-auctioneer',
  templateUrl: './auctioneer.component.html',
  styleUrls: ['./auctioneer.component.scss']
})
export class AuctioneerComponent implements OnInit {
  auctionData: Auction[];
  selectedAuction: Auction;
  showNewAuctionForm = false;
  newAuction: Auction;

  constructor (private socketService: SocketService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.socketService.auctionData$.subscribe(ad => this.auctionData = ad);
    this.socketService.selectedAuction$.subscribe(sa => this.selectedAuction = sa);
  }

  open(auctionId: number) {
    this.socketService.openAuction(auctionId);
  }

  start(auctionId: number) {
    this.router.navigate(['/'])
  }

  getDetails(auctionId: number) {
    this.socketService.getAuctionDetails(auctionId);
  }

  toggleNewAuctionForm() {
    if (!this.showNewAuctionForm && !this.newAuction) { this.newAuction = new Auction() }
    this.showNewAuctionForm = !this.showNewAuctionForm;
  }

  submitNewAuction() {
    this.apiService.createNewAuction(this.newAuction).subscribe(a => {
      this.auctionData.push(a);
      this.selectedAuction = a;
    });
  }

}
