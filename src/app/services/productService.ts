import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Product, ProductBuy } from '../models/product';
import { ProductDetail } from '../models/productDetail';
import { CacheService } from './cacheService';
import { Count } from '../models/count';

/**
 * Servicio para obtener productos de la API
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://itx-frontend-test.onrender.com/api';

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  /**
   * Metodo para obtener todos los productos
   * @returns Un observable con la respuesta de la API
   */
  getProducts(): Observable<Product[]> {
    const cacheData = this.cacheService.getListPrioductsCache();
    if (cacheData != null) {
      return of(cacheData);
    } else {
      // si no hay productos en cache o han pasado mas de 1 hora
      return this.http.get<Product[]>(this.apiUrl + '/product').pipe(
        tap((data) => {
          localStorage.setItem(
            'products',
            JSON.stringify({ data, timestamp: Date.now() })
          );
        })
      );
    }
  }

  /**
   * Metodo para obtener un producto por su id
   * @param id Id del producto a obtener
   * @returns Un observable con la respuesta de la API
   */
  getProductById(id: string): Observable<ProductDetail> {
    let cacheData = this.cacheService.getProductDetailCache(id);

    if (cacheData != null) {
      return of(cacheData);
    } else {
      // si no hay productos en cache o han pasado mas de 1 hora
      return this.http.get<ProductDetail>(this.apiUrl + '/product/' + id).pipe(
        tap((data: ProductDetail) => {
          localStorage.setItem(
            'product_' + id,
            JSON.stringify({ data, timestamp: Date.now() })
          );
        })
      );
    }
  }

  /**
   * Metodo para añadir un producto al carrito
   * @param product Pruoducto a añadir al carrito
   * @returns Un observable con la respuesta de la API
   */
  addToCart(product: ProductBuy): Observable<Count> {
    return this.http.post<Count>(this.apiUrl + '/cart', product);
  }
}
