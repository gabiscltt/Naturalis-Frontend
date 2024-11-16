import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/produto.model';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrl: './finalizar-compra.component.css'
})
export class FinalizarCompraComponent implements OnInit {
  currentStep: number = 1;
  cart: Product[] = [];
  userData = { name: '', email: '', cpf: '' };
  deliveryData = { address: '', zip: '' };
  paymentData = { 
    method: 'creditCard',
    cardNumber: '', 
    expiry: '', 
    cvv: '' 
  };
  showAlert: boolean = false;
  alertTitle: string = '';
  alertMessage: string = '';

  steps = [
    { name: 'Carrinho', icon: 'fa-cart-shopping' },
    { name: 'Identificação', icon: 'fa-user' },
    { name: 'Entrega', icon: 'fa-truck' },
    { name: 'Pagamento', icon: 'fa-credit-card' }
  ];

  ngOnInit(): void {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }

  goToNextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  goToPrevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  removeProduct(product: Product): void {
    this.cart = this.cart.filter(p => p.productId !== product.productId);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  increaseQuantity(product: Product): void {
    product.quantity++;
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  decreaseQuantity(product: Product): void {
    if (product.quantity > 1) {
      product.quantity--;
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  submitIdentification(): void {
    if (this.userData.name && this.userData.email) {
      this.goToNextStep();
    }
  }

  submitDelivery(): void {
    if (this.deliveryData.address && this.deliveryData.zip) {
      this.goToNextStep();
    }
  }

  submitPayment(): void {
    if (this.paymentData.method === 'creditCard' && this.paymentData.cardNumber && this.paymentData.expiry && this.paymentData.cvv) {
      this.alertTitle = 'Compra Finalizada!';
      this.alertMessage = '💳 Compra finalizada com Cartão de Crédito! 🎉';
      this.showAlert = true;
    } else if (this.paymentData.method === 'pix') {
      this.alertTitle = 'Compra Finalizada!';
      this.alertMessage = '📱 Compra finalizada via PIX! Realize o pagamento enviado por email para confirmar o pedido. ✨';
      this.showAlert = true;
    } else if (this.paymentData.method === 'boleto') {
      this.alertTitle = 'Compra Finalizada!';
      this.alertMessage = '🧾 Compra finalizada com Boleto! Realize o pagamento enviado por email para confirmar o pedido. 💌';
      this.showAlert = true;
    }
    localStorage.clear();

  }
  
  closeAlert(): void {
    this.showAlert = false;
  }
  
}
