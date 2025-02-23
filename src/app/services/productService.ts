import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { ProductDetail } from '../models/productDetail';

/**
 * Servicio para obtener productos de la API
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://itx-frontend-test.onrender.com/api';
  private cacheExpiration = 3600000;

  constructor(private http: HttpClient) {}

  /**
   * Metodo para obtener todos los productos
   * @returns Un observable con la respuesta de la API
   */
  getProducts(): Observable<Product[]> {
    // Comprobar si hay productos en cache
    const cacheProducts = localStorage.getItem('products');
    // si hay productos en cache y no han pasado mas de 1 hora desde la ultima peticion
    if (cacheProducts) {
      const cacheProductData = JSON.parse(cacheProducts);
      if (Date.now() - cacheProductData.timestamp < this.cacheExpiration) {
        return of(cacheProductData.data);
      }
    }
    // si no hay productos en cache o han pasado mas de 1 hora
    return this.http.get<Product[]>(this.apiUrl + '/product').pipe(
      map((data) => {
        localStorage.setItem(
          'products',
          JSON.stringify({ data, timestamp: Date.now() })
        );
        return data;
      })
    );
  }

  /**
   * Metodo para obtener un producto por su id
   * @param id Id del producto a obtener
   * @returns Un observable con la respuesta de la API
   */
  getProductById(id: string): Observable<ProductDetail> {
    // Comprobar si el detalle de un producto esta en cache
    const cacheProductId = localStorage.getItem('product_' + id);
    // si hay productos en cache y no han pasado mas de 1 hora desde la ultima peticion
    if (cacheProductId) {
      const cacheProductIdParse = JSON.parse(cacheProductId);
      if (Date.now() - cacheProductIdParse.timestamp < this.cacheExpiration) {
        return of(cacheProductIdParse.data);
      }
    }
    // si no hay productos en cache o han pasado mas de 1 hora
    return this.http.get<ProductDetail>(this.apiUrl + '/product/' + id).pipe(
      map((data: ProductDetail) => {
        localStorage.setItem(
          'product_' + id,
          JSON.stringify({ data, timestamp: Date.now() })
        );
        return data;
      })
    );
  }
}
