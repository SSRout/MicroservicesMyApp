import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  features = [
    {
      icon: 'local_shipping',
      title: 'Free Shipping',
      description: 'Free shipping on all orders over $50',
    },
    {
      icon: 'verified',
      title: 'Secure Checkout',
      description: '100% secure payment processing',
    },
    {
      icon: 'assignment_return',
      title: '30-Day Returns',
      description: 'Easy returns within 30 days',
    },
    {
      icon: 'support_agent',
      title: '24/7 Support',
      description: 'Dedicated customer support team',
    },
  ];
}
