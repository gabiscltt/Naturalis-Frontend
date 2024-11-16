import { Component, Input, OnInit } from '@angular/core';
import { CarrinhoComponent } from '../carrinho/carrinho/carrinho.component';
import { Product } from '../models/produto.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  @Input() cartQuantity: number = 0;

  constructor(private dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadCartQuantity();
  }

  loadCartQuantity(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cart: Product[] = JSON.parse(storedCart);
      this.cartQuantity = cart.reduce((total: number, item: Product) => total + item.quantity, 0);
    }
  }
  updateCartQuantity(updatedQuantity: number): void {
    this.cartQuantity = updatedQuantity; 
  }

  openCartDialog(): void {
    const dialogRef = this.dialog.open(CarrinhoComponent, {
      width: '400px',
      data: null,
    });

    dialogRef.componentInstance.cartUpdated.subscribe((updatedQuantity: number) => {
      this.updateCartQuantity(updatedQuantity);
    });
  }
}
