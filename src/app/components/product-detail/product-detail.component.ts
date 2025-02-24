import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { signal } from '@angular/core';
import { ProductService } from '../../services/productService';
import { currentProductName } from '../../app.component';
import { CacheProductDetail, ProductDetail } from '../../models/productDetail';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDivider } from '@angular/material/divider';

/**
 * Componente para mostrar los detalles de un producto
 */
@Component({
  selector: 'app-product-detail',
  imports: [MatFormFieldModule, MatSelectModule, MatDivider],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product = signal<ProductDetail | null>(null);
  selectedColor = signal<string>('');
  selectedStorage = signal<number>(0);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data: ProductDetail | CacheProductDetail | null) => {
          if (data && 'brand' in data && 'model' in data) {
            currentProductName.set(data.brand + ' ' + data.model);
            this.product.set(data);

            if (Array.isArray(data.colors) && data.colors.length > 0) {
              if (data.colors[0] !== undefined) {
                this.selectedColor.set(data.colors[0]);
              }
            }

            if (data.options && data.options.storages.length > 0) {
              this.selectedStorage.set(data.options.storages[0].code);
            }

            console.log('Detalles del producto:', data);
          }
        },
        error: (error) =>
          console.error('Error al obtener detalles del producto:', error),
      });
    }
  }
}
