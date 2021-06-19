import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuctioneerComponent } from './auctioneering/auctioneer/auctioneer.component';
import { AuctionDetailsComponent } from './auctioneering/auction-details/auction-details.component';
import { AuctioneerAuctionComponent } from './auctioneering/auctioneer-auction/auctioneer-auction.component';
import { ItemManagementComponent } from './auctioneering/item-management/item-management.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddItemDialogComponent } from './auctioneering/add-item-dialog/add-item-dialog.component';
import { AddBidderDialogComponent } from './auctioneering/add-bidder-dialog/add-bidder-dialog.component';
import { BidderManagementComponent } from './auctioneering/bidder-management/bidder-management.component';
import { AuctionEndComponent } from './auctioneering/auction-end/auction-end.component';
import { BidderComponent } from './bidder/bidder.component';
import { BidderAuctionComponent } from './bidder-auction/bidder-auction.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClipboardModule } from 'ngx-clipboard';
import { SpectatorComponent } from './spectator/spectator.component';

@NgModule({
  declarations: [
    AppComponent,
    AuctioneerComponent,
    AuctionDetailsComponent,
    AuctioneerAuctionComponent,
    ItemManagementComponent,
    AddItemDialogComponent,
    AddBidderDialogComponent,
    BidderManagementComponent,
    AuctionEndComponent,
    BidderComponent,
    BidderAuctionComponent,
    SpectatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
