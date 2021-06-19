import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { SocketService } from '../socket.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-bidder',
  templateUrl: './bidder.component.html',
  styleUrls: ['./bidder.component.scss']
})
export class BidderComponent implements OnInit {

  auctionCode: string;
  codeInput: string;
  name: string;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private socketService: SocketService,
    private storageService: StorageService,
    private apiService: ApiService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.userType = 'bidder';
    this.auctionCode = this.route.snapshot.paramMap.get('auctionCode');

    const config = this.storageService.getConfig();
    if (!!this.auctionCode && !!config) {
      if (config.auctionCode === this.auctionCode){
        this.socketService.rejoin(config.auctionCode, config.userId);
        this.socketService.bidderId$.next(config.userId);
        this.router.navigate([`bidder/auction`]);
      }
    }
  }

  reroute() {
    this.router.navigate([`bidder/${this.codeInput}`]);
  }

  goToGame() {
    this.apiService.getAuctionByCode(this.auctionCode).subscribe(auction => {
      this.socketService.selectedAuction$.next(auction);
      this.socketService.joinRoom(this.auctionCode, this.name);
      this.socketService.bidderId$.subscribe(id => {
        if (!!id){
        this.router.navigate([`bidder/auction`]);
        }
      }
      );
    });
  }
}
