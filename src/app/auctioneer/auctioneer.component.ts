import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { SocketService } from '../socket.service';
import { Auction } from '../models/auction';

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

  start(auctionId: number) {
    this.apiService.updateAuctionStatus(auctionId, 'in-progress').subscribe(a => {
      this.socketService.selectedAuction$.next(a);
      this.router.navigate(['/']);
    });
  }

  getDetails(auctionId: number) {
    this.socketService.getAuctionDetails(auctionId);
  }

  toggleNewAuctionForm() {
    if (!this.showNewAuctionForm && !this.newAuction) { this.newAuction = new Auction() }
    this.showNewAuctionForm = !this.showNewAuctionForm;
  }

  submitNewAuction() {
    this.apiService.createNewAuction(this.newAuction).subscribe((a: Auction) => {
      this.auctionData.push(a);
      this.socketService.selectedAuction$.next(a);
      this.selectedAuction = a;
      this.toggleNewAuctionForm();
    });
  }

  deleteAuction(auction: Auction) {
    this.selectedAuction = null;
    const index = this.auctionData.findIndex(a => a.id === auction.id);
    this.auctionData.splice(index, 1);
  }

}
