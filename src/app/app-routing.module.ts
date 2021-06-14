import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuctionEndComponent } from './auction-end/auction-end.component';
import { AuctioneerAuctionComponent } from './auctioneer-auction/auctioneer-auction.component';
import { AuctioneerComponent } from './auctioneer/auctioneer.component';
import { BidderManagementComponent } from './bidder-management/bidder-management.component';
import { ItemManagementComponent } from './item-management/item-management.component';

const routes: Routes = [
    { path: 'auctioneer', component: AuctioneerComponent },
    { path: 'auctioneer/auction', component: AuctioneerAuctionComponent },
    { path: 'auction/end', component: AuctionEndComponent },
    { path: 'inventory', component: ItemManagementComponent },
    { path: 'bidders', component: BidderManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
