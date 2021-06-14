import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../api.service';
import { Auction, Item } from '../models/auction';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent implements OnInit, OnChanges {
  @Input() auction: Auction;
  @Output() itemAdded = new EventEmitter<any>();
  @Output() itemRemoved = new EventEmitter<Item>();
  @Output() close = new EventEmitter<any>();
  allItems: Item[];
  unusedItems: Item[] = [];

  constructor (private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllItems().subscribe(items => {
      this.allItems = items;
      this.filterItems();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.apiService.getAllItems().subscribe(items => {
      this.allItems = items;
      this.filterItems();
    });
  }

  private filterItems() {
    if (this.auction.items) {
      this.unusedItems = this.allItems.except(this.auction.items, (x, y) => x.itemId === y.itemId).toArray();
    } else {
      this.unusedItems = [...this.allItems];
    }
  }

  addItem(item: Item) {
    this.apiService.addItemToAuction(item.itemId, this.auction.id).subscribe((newItem:Item) => {
      this.itemAdded.emit(newItem);
      this.filterItems();
    });
  }

  removeItem(item: Item) {
    this.apiService.removeItemFromAuction(item.auctionItemId).subscribe(_ => {
      this.itemRemoved.emit(item);
      this.filterItems();
    });
  }
}
