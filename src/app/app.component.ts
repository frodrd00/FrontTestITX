import { Component, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';

export const currentProductName = signal<string>('');
export const cartItemCount = signal<number>(
  parseInt(localStorage.getItem('cartCount') || '0', 10)
);

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'phonesStoreApp';
}
