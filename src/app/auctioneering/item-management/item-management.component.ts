import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Item } from '../../models/auction';

@Component({
  selector: 'app-item-management',
  templateUrl: './item-management.component.html',
  styleUrls: ['./item-management.component.scss']
})
export class ItemManagementComponent implements OnInit {
  items: Item[] = [];
  newItem: Item;
  showSubmitForm = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    console.log('managing items');
    this.apiService.getAllItems().subscribe(i => this.items = i);
  }

  openSubmitForm() {
    if (!this.newItem) { this.newItem = new Item(); }
    this.showSubmitForm = true;
  }

  submitNewItem() {
    // loading = true;
    this.apiService.createNewItem(this.newItem).subscribe(i => {
      // loading = false;
      this.items.push(i);
    });
  }

}
