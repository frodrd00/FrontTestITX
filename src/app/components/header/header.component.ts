import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { cartItemCount } from '../../app.component';

@Component({
  selector: 'app-header',
  imports: [BreadcrumbsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cartItemCount = cartItemCount;

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
