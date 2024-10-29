import { Component } from '@angular/core';
import { ProductService } from '../services/item-service.service';
import { Product } from '../models/produto.model';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = ''; // Add this line

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  filterByType(typeName: string) {
    console.log(`Filtering by type: ${typeName}`);
    this.filteredProducts = this.products.filter(product => 
      product.productTypeNavigation.typeName === typeName
    );
  }

  filterByName() {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product => 
      product.productName.toLowerCase().includes(query)
    );
  }
}
