import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor (private route: ActivatedRoute, private router: Router, private socketService: SocketService) { }

  ngOnInit(): void {
    this.auctionCode = this.route.snapshot.paramMap.get('auctionCode');
  }

  reroute() {
    this.router.navigate([`bidder/${this.codeInput}`]);
  }

  goToGame() {
    this.socketService.joinRoom(this.auctionCode, this.name);
    this.router.navigate([`bidder/auction`]);
  }
}
