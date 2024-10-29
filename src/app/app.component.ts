import { Component } from '@angular/core';
import { ProductService } from './services/item-service.service';
import { Item } from './models/item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  items: Item[] = [];

  constructor(private itemService: ProductService) {}

  ngOnInit() {
  }
}
