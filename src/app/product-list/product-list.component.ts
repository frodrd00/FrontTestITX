import { Component, signal } from '@angular/core';
import { ProductService } from '../../services/productService';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products = signal<any[]>([]);
  filteredProducts = signal<any[]>([]);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  /**
   * Cargar productos desde el servicio
   */
  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.filteredProducts.set(data);
      },
      error: (error) => console.error('Error al obtener productos:', error),
    });
  }
}
