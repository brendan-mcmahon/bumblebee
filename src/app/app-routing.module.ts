import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuctionEndComponent } from './auctioneering/auction-end/auction-end.component';
import { AuctioneerAuctionComponent } from './auctioneering/auctioneer-auction/auctioneer-auction.component';
import { AuctioneerComponent } from './auctioneering/auctioneer/auctioneer.component';
import { BidderManagementComponent } from './auctioneering/bidder-management/bidder-management.component';
import { BidderComponent } from './bidder/bidder.component';
import { ItemManagementComponent } from './auctioneering/item-management/item-management.component';
import { BidderAuctionComponent } from './bidder-auction/bidder-auction.component';
import { SpectatorComponent } from './spectator/spectator.component';

const routes: Routes = [
  { path: 'bidder', component: BidderComponent },
  { path: 'bidder/auction', component: BidderAuctionComponent },
  { path: 'bidder/:auctionCode', component: BidderComponent },
  { path: 'auctioneer', component: AuctioneerComponent },
  { path: 'auctioneer/auction', component: AuctioneerAuctionComponent },
  { path: 'auction/end', component: AuctionEndComponent },
  { path: 'inventory', component: ItemManagementComponent },
  { path: 'bidders', component: BidderManagementComponent },
  { path: 'spectator/:auctionCode', component: SpectatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
