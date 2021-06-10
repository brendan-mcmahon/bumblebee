import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { Auction, Item } from '../models/auction';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent implements OnInit {
  @Input() auction: Auction;
  @Output() itemAdded = new EventEmitter<Item>();
  allItems: Item[];
  items: Item[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllItems().subscribe(items => {
      this.allItems = items;
      this.filterItems();
    });
  }

  private filterItems() {
    this.items = this.allItems.filter(i => !this.auction.items.find(i2 => i2.id === i.id));
  }

  addItem(item: Item) {
    this.apiService.addItemToAuction(item.id, this.auction.id).subscribe(_ => {
      this.itemAdded.emit(item);
      this.filterItems();
    });
  }
}
