import { Component } from '@angular/core';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {
  products = [
    { name: 'Product 1' },
    { name: 'Product 2' },
    { name: 'Product 3' },
    { name: 'Product 4' },
    { name: 'Product 5' },
    { name: 'Product 6' },
    { name: 'Product 6' },
    { name: 'Product 6' },
    { name: 'Product 6' },
    { name: 'Product 6' },
    { name: 'Product 6' },
    { name: 'Product 6' },
  ];

  productTypes = [
    'Type 1',
    'Type 2',
    'Type 3',
  ];
}
