import { Component } from '@angular/core';
import { ItemService } from './services/item-service.service';
import { Item } from './models/item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  items: Item[] = [];

  

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getAllItems().subscribe(items => this.items = items);
  }
}
