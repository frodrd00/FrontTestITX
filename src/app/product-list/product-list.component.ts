import { Component, effect, signal } from '@angular/core';
import { ProductService } from '../../services/productService';
import { ProductItemComponent } from '../product-item/product-item.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { currentProductName } from '../app.component';

/**
 * Componente para mostrar la lista de productos
 */
@Component({
  selector: 'app-product-list',
  imports: [ProductItemComponent, MatPaginatorModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products = signal<any[]>([]);
  filteredProducts = signal<any[]>([]);
  searchQuery = signal<string>('');
  pageIndex = 0;
  pageSize = 8;

  constructor(private productService: ProductService) {
    // Filtrar productos según la búsqueda, se emite cada vez que se cambia la búsqueda
    effect(() => {
      const query = this.searchQuery().toLowerCase();
      this.filteredProducts.set(
        this.products().filter(
          (product) =>
            product.brand.toLowerCase().includes(query) ||
            product.model.toLowerCase().includes(query)
        )
      );
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    currentProductName.set('');
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

  /**
   * Evento que se emite al cambiar de página en la paginación
   * @param event Evento de cambio de página
   */
  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
