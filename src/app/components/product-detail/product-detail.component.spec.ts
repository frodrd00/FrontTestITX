import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProductService } from '../../services/productService';
import { currentProductName } from '../../app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    productServiceMock = {
      getProductById: jasmine
        .createSpy('getProductById')
        .and.returnValue(of({ brand: 'TestBrand', model: 'TestModel' })),
      addToCart: jasmine
        .createSpy('addToCart')
        .and.returnValue(of({ count: 1 })),
    };

    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('123'),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a getProductById y establecer los datos del producto en caso de éxito', () => {
    component.getProductData();
    expect(productServiceMock.getProductById).toHaveBeenCalledWith('123');
    expect(component.product()).toEqual({
      brand: 'TestBrand',
      model: 'TestModel',
    });
    expect(currentProductName()).toBe('TestBrand TestModel');
  });

  it('debería manejar el error cuando getProductById falla', () => {
    spyOn(console, 'error');
    productServiceMock.getProductById.and.returnValue(throwError('Error'));
    component.getProductData();
    expect(console.error).toHaveBeenCalledWith(
      'Error al obtener detalles del producto:',
      'Error'
    );
  });

  it('debería añadir el producto al carrito', () => {
    component.product = signal({
      id: '123',
      brand: 'TestBrand',
      model: 'TestModel',
    });
    component.selectedColor = signal('colorCode');
    component.selectedStorage = signal(123);

    component.addToCart();

    expect(productServiceMock.addToCart).toHaveBeenCalledWith({
      id: '123',
      colorCode: 'colorCode',
      storageCode: 123,
    });
  });
});
