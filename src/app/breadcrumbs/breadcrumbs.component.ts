import { Component, effect, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { currentProductName } from '../app.component';

@Component({
  selector: 'app-breadcrumbs',
  imports: [MatButtonModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent {
  breadcrumbs = signal<{ label: string; url: string }[]>([]);

  constructor(private router: Router) {
    // Observa los cambios en currentProductName y actualiza breadcrumbs
    effect(() => {
      if (currentProductName() != null && currentProductName() != 'undefined')
        this.updateBreadcrumbs();
    });
  }

  updateBreadcrumbs() {
    const path = this.router.url.split('/').filter((p) => p);
    let breadcrumbList = [{ label: 'Inicio', url: '/' }];
    if (path && path[0] === 'product') {
      breadcrumbList.push({
        label: currentProductName() || 'Cargando...',
        url: this.router.url,
      });
    }
    this.breadcrumbs.set(breadcrumbList);
  }
}
