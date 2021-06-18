import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { SocketService } from '../socket.service';

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
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.auctionCode = this.route.snapshot.paramMap.get('auctionCode');
  }

  reroute() {
    this.router.navigate([`bidder/${this.codeInput}`]);
  }

  goToGame() {
    this.apiService.getAuctionByCode(this.auctionCode).subscribe(auction => {
      this.socketService.selectedAuction$.next(auction);
      this.socketService.joinRoom(this.auctionCode, this.name);
      this.socketService.bidderId$.subscribe(id =>
        this.router.navigate([`bidder/auction`])
      )
    });
  }
}
