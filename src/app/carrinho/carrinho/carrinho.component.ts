import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../models/produto.model';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent {
  cart: Product[] = [];

  @Output() cartUpdated = new EventEmitter<number>();

  constructor(
    public dialogRef: MatDialogRef<CarrinhoComponent>
  ) {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  ngOnInit(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart).map((product: Product) => ({
        ...product,
        productPrice: Number(product.productPrice),
        quantity: Number(product.quantity) || 1,
      }));
    }
  }

  getTotal(): number {
    return this.cart.reduce((total, product) => {
      const price = Number(product.productPrice);
      const quantity = Number(product.quantity);

      if (!isNaN(price) && !isNaN(quantity)) {
        return total + (price * quantity);
      }
      return total;
    }, 0);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  buy(): void {
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(product => product.productId !== productId);
    this.updateLocalStorage();
    this.emitCartQuantity(); 
  }

  increaseQuantity(productId: number): void {
    const product = this.cart.find(p => p.productId === productId);
    if (product) {
      product.quantity = Number(product.quantity) + 1;
      this.updateLocalStorage();
      this.emitCartQuantity(); 
    }
  }

  decreaseQuantity(productId: number): void {
    const product = this.cart.find(p => p.productId === productId);
    if (product && product.quantity > 1) {
      product.quantity = Number(product.quantity) - 1;
      this.updateLocalStorage();
      this.emitCartQuantity(); 
    }
  }

  private updateLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private emitCartQuantity(): void {
    const totalQuantity = this.cart.reduce((total, item) => total + item.quantity, 0);
    this.cartUpdated.emit(totalQuantity); 
  }

}
