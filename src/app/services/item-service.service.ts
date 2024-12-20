
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/produto.model';
import { environment } from '../../environments.ts/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addPurchase(purchaseData: any): Observable<any> {
    return this.http.post(this.apiUrl, purchaseData);
  }

  getPurchasesByCpf(cpf: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetPurchasesByCpf/${cpf}`);
  }
}
