import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Auction, Item } from '../models/auction';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-spectator',
  templateUrl: './spectator.component.html',
  styleUrls: ['./spectator.component.scss']
})
export class SpectatorComponent implements OnInit {

  constructor (private socketService: SocketService,
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute) { }

  auction: Auction;
  currentItem: Item;


  ngOnInit(): void {
    this.dataService.userType = 'spectator';
    const auctionCode = this.route.snapshot.paramMap.get('auctionCode');
    this.socketService.spectatorJoin(auctionCode);

    this.socketService.selectedAuction$.subscribe(auction => {
      if (!!auction) {
        if (auction.status === 'complete') {
          this.router.navigate(['auction/end']);
        }
        this.auction = auction;
        this.setCurrentItem();
      }
    });
  }
  private setCurrentItem() {
    this.currentItem = this.auction.items.find(i => i.auctionItemId === this.auction.currentAuctionItemId);
  }
}
