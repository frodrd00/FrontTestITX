import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

/**
 * Servicio para obtener productos de la API
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://itx-frontend-test.onrender.com/api';
  private cacheExpiration = 3600000;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los productos de la API
   * @returns
   */
  getProducts(): Observable<any> {
    const cacheProducts = localStorage.getItem('products');
    if (cacheProducts) {
      const cacheProductData = JSON.parse(cacheProducts);
      if (Date.now() - cacheProductData.timestamp < this.cacheExpiration) {
        return of(cacheProductData.data);
      }
    }
    return this.http.get<any>(this.apiUrl + '/product').pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        console.error('Error al obtener productos:', error);
        return of(null);
      })
    );
  }

  /**
   * Obtener un producto por su ID
   * @param id
   * @returns
   */
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/product/' + id).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        console.error('Error al obtener productos:', error);
        return of(null);
      })
    );
  }
}
