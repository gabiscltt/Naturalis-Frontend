import { Component } from '@angular/core';
import { ProductService } from '../services/item-service.service';
import { Product } from '../models/produto.model';
import { MatDialog } from '@angular/material/dialog';
import { CarrinhoComponent } from '../carrinho/carrinho/carrinho.component';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';

  constructor(
    private dialog: MatDialog,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  filterByType(typeName: string) {
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

  addProductToCart(product: Product): void {
    let cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingProduct = cart.find(p => p.productId === product.productId);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    this.dialog.open(CarrinhoComponent, {
      width: '400px',
      data: cart
    });
  }

}
