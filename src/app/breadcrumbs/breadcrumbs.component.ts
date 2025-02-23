import { Component, OnInit, signal } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs = signal<{ label: string; url: string }[]>([]);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url;
        console.log('Current URL:', url); // Verifica el valor de la URL
        let path = url ? url.split('/').filter((p) => p) : [];
        let breadcrumbList = [{ label: 'Inicio', url: '/' }];
        if (path && path[0] === 'product') {
          breadcrumbList.push({
            label: '123',
            url: this.router.url,
          });
        }
        this.breadcrumbs.set(breadcrumbList);
      }
    });
  }
}
