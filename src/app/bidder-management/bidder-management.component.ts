import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Bidder } from '../models/auction';

@Component({
  selector: 'app-bidder-management',
  templateUrl: './bidder-management.component.html',
  styleUrls: ['./bidder-management.component.scss']
})
export class BidderManagementComponent implements OnInit {
  bidders: Bidder[] = [];
  newBidder: Bidder;
  showSubmitForm = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllBidders().subscribe(b => this.bidders = b);
  }

  openSubmitForm() {
    if (!this.newBidder) { this.newBidder = new Bidder(); }
    this.showSubmitForm = true;
  }

  submitNewBidder() {
    // loading = true;
    this.apiService.createNewBidder(this.newBidder).subscribe(b => {
      // loading = false;
      this.bidders.push(b);
    });
  }

}
