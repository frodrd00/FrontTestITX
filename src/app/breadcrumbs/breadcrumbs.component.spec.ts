import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { ActivatedRoute } from '@angular/router';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '/product',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
