import { Component, effect, signal, OnInit } from '@angular/core';
import { ProductService } from '../../services/productService';
import { ProductItemComponent } from '../product-item/product-item.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { currentProductName } from '../../app.component';
import { Product } from '../../models/product';
import { SearchBarComponent } from '../../search-bar/search-bar.component';

/**
 * Componente para mostrar la lista de productos
 */
@Component({
  selector: 'app-product-list',
  imports: [ProductItemComponent, MatPaginatorModule, SearchBarComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
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
            (product.brand?.toLowerCase().includes(query) ?? false) ||
            (product.model?.toLowerCase().includes(query) ?? false)
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

  /**
   * Actualizar la búsqueda de productos
   * @param query
   */
  updateSearchQuery(input: string): void {
    this.searchQuery.set(input);
  }
}
