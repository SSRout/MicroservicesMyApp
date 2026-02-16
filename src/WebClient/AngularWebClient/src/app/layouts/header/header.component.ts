import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CartService } from '@core/services/cart.service';
import { AuthService, User } from '@core/services/auth.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  currentUser$!: Observable<User | null>;
  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cartService.basket$
      .pipe(takeUntil(this.destroy$))
      .subscribe((basket) => {
        this.cartItemCount = this.cartService.getItemCount();
      });

    this.currentUser$ = this.authService.currentUser$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
