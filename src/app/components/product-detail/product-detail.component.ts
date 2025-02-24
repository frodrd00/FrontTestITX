import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { signal } from '@angular/core';
import { ProductService } from '../../services/productService';
import { cartItemCount, currentProductName } from '../../app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDivider } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { Count } from '../../models/count';

/**
 * Componente para mostrar los detalles de un producto
 */
@Component({
  selector: 'app-product-detail',
  imports: [MatFormFieldModule, MatSelectModule, MatDivider, MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product = signal<any>(null);
  selectedColor = signal<string>('');
  selectedStorage = signal<number>(0);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProductData();
  }

  ngOnDestroy(): void {
    this.snackBar.dismiss();
  }

  /**
   * Metodo para obtener el detalle del producto
   */
  getProductData() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => {
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

  /**
   * Método para añadir un el,ento al carriito
   */
  addToCart(): void {
    // Lógica para añadir al carrito
    this.productService
      .addToCart({
        id: this.product().id,
        colorCode: this.selectedColor(),
        storageCode: this.selectedStorage(),
      })
      .subscribe({
        next: (data: Count) => {
          console.log('Producto añadido al carrito:', data);
          cartItemCount.set(data.count);
          localStorage.setItem('cartCount', data.count.toString());
          this.snackBar.open('Producto añadido al carrito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
        error: (error) => console.error('Error al añadir al carrito:', error),
      });
  }
}
