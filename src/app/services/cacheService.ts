import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CacheService {
  private cacheExpiration = 3600000;

  getListPrioductsCache(): any {
    // Comprobar si hay productos en cache
    const cacheProducts = localStorage.getItem('products');
    // si hay productos en cache y no han pasado mas de 1 hora desde la ultima peticion
    if (cacheProducts) {
      const cacheProductData: any = JSON.parse(cacheProducts);
      if (Date.now() - cacheProductData.timestamp < this.cacheExpiration) {
        return of(cacheProductData.data);
      }
    }

    return null;
  }

  getProductDetailCache(id: string) {
    // Comprobar si el detalle de un producto esta en cache
    const cacheProductId = localStorage.getItem('product_' + id);
    // si hay productos en cache y no han pasado mas de 1 hora desde la ultima peticion
    if (cacheProductId) {
      const cacheProductIdParse = JSON.parse(cacheProductId);
      if (Date.now() - cacheProductIdParse.timestamp < this.cacheExpiration) {
        return of(cacheProductIdParse.data);
      }
    }

    return null;
  }
}
