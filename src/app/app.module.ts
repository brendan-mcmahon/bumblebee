import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuctioneerComponent } from './auctioneer/auctioneer.component';
import { AuctionDetailsComponent } from './auction-details/auction-details.component';
import { AuctioneerAuctionComponent } from './auctioneer-auction/auctioneer-auction.component';
import { ItemManagementComponent } from './item-management/item-management.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { AddBidderDialogComponent } from './add-bidder-dialog/add-bidder-dialog.component';
import { BidderManagementComponent } from './bidder-management/bidder-management.component';

@NgModule({
  declarations: [
    AppComponent,
    AuctioneerComponent,
    AuctionDetailsComponent,
    AuctioneerAuctionComponent,
    ItemManagementComponent,
    AddItemDialogComponent,
    AddBidderDialogComponent,
    BidderManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
