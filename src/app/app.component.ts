import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from './models/produto.model';
import { CarrinhoComponent } from './carrinho/carrinho/carrinho.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cart: Product[] = [];
  cartQuantity: number = 0;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.updateCartQuantity();
    }
  }

  addProductToCart(product: Product): void {
    const existingProduct = this.cart.find(p => p.productId === product.productId);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.updateLocalStorage();
    this.updateCartQuantity(); 
  }

  openCartDialog(): void {
    this.dialog.open(CarrinhoComponent, {
      width: '400px',
      data: this.cart,
    });
  }

  private updateLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private updateCartQuantity(): void {
    this.cartQuantity = this.cart.reduce((total, item) => total + item.quantity, 0);
  }
}
