import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { signal } from '@angular/core';
import { ProductService } from '../../services/productService';
import { currentProductName } from '../../app.component';
import { ProductDetail } from '../../models/productDetail';
import { Product } from '../../models/product';

/**
 * Componente para mostrar los detalles de un producto
 */
@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product = signal<Product | null>(null);

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
        next: (data: ProductDetail) => {
          this.product.set(data);
          currentProductName.set(data.brand + ' ' + data.model);
        },
        error: (error) =>
          console.error('Error al obtener detalles del producto:', error),
      });
    }
  }
}
