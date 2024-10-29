import { ProductType } from "./productType.model";

export interface Product {
    productId: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    image: string;
    productType: number;
    productTypeNavigation: ProductType;
  }