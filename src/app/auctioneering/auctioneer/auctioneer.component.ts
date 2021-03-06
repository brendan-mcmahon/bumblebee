import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { SocketService } from '../../socket.service';
import { Auction } from '../../models/auction';
import { DataService } from 'src/app/data.service';

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

  constructor (private socketService: SocketService, private apiService: ApiService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.userType = 'auctioneer';
    this.socketService.auctioneer();
    this.socketService.auctionData$.subscribe(ad => this.auctionData = ad);
    this.socketService.selectedAuction$.subscribe(sa => this.selectedAuction = sa);
  }

  getDetails(auctionId: number) {
    this.socketService.getAuctionDetails(auctionId);
  }

  toggleNewAuctionForm() {
    if (!this.showNewAuctionForm && !this.newAuction) { this.newAuction = new Auction() }
    this.showNewAuctionForm = !this.showNewAuctionForm;
  }

  submitNewAuction() {
    this.newAuction.code = this.createCode();
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

  private createCode(): string {
    // const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    const alphabet = [...'ASDFQWERZXVC'];

    return [...Array(4)]
    .map(i => alphabet[Math.random()*12|0]) //TODO: Make this 26 again
    .join('');
  }

}
