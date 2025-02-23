import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { of, throwError } from 'rxjs';
import { ProductService } from '../../services/productService';
import { MatPaginatorModule } from '@angular/material/paginator';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceMock: any;

  beforeEach(async () => {
    productServiceMock = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [MatPaginatorModule, ProductListComponent],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar productos al inicializar', () => {
    const products = [{ brand: 'Brand1', model: 'Model1' }];
    productServiceMock.getProducts.and.returnValue(of(products));

    component.ngOnInit();

    expect(productServiceMock.getProducts).toHaveBeenCalled();
    expect(component.products()).toEqual(products);
    expect(component.filteredProducts()).toEqual(products);
  });

  it('debería manejar el error al cargar productos', () => {
    const consoleSpy = spyOn(console, 'error');
    productServiceMock.getProducts.and.returnValue(throwError('Error'));

    component.loadProducts();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error al obtener productos:',
      'Error'
    );
  });

  it('debería actualizar el índice y tamaño de página al cambiar de página', () => {
    const event = { pageIndex: 1, pageSize: 10 };
    component.onPageChange(event);

    expect(component.pageIndex).toBe(1);
    expect(component.pageSize).toBe(10);
  });
});
