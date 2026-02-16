import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { CartService } from "@core/services/cart.service";
import { IBasket, ICartItem } from "@core/models/models";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit, OnDestroy {
  basket: IBasket | null = null;
  totalPrice: number = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cartService.basket$
      .pipe(takeUntil(this.destroy$))
      .subscribe((basket) => {
        this.basket = basket;
        this.calculateTotal();
      });
    this.cartService.loadBasket();
  }

  calculateTotal(): void {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  updateQuantity(item: ICartItem, quantity: number): void {
    if (quantity > 0) {
      item.quantity = quantity;
      this.cartService
        .updateCartItem(item)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (basket) => {
            this.cartService.updateBasket(basket);
            this.calculateTotal();
          },
          (error) => {
            console.error("Failed to update cart", error);
            this.snackBar.open("Failed to update cart", "Close", {
              duration: 3000,
            });
          },
        );
    }
  }

  removeItem(productId: string): void {
    this.cartService
      .removeFromCart(productId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.cartService.loadBasket();
          this.snackBar.open("Item removed from cart", "Close", {
            duration: 3000,
          });
        },
        (error) => {
          console.error("Failed to remove item", error);
          this.snackBar.open("Failed to remove item", "Close", {
            duration: 3000,
          });
        },
      );
  }

  clearCart(): void {
    if (confirm("Are you sure you want to clear your cart?")) {
      this.cartService
        .clearBasket()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.cartService.loadBasket();
            this.snackBar.open("Cart cleared", "Close", { duration: 3000 });
          },
          (error) => {
            console.error("Failed to clear cart", error);
            this.snackBar.open("Failed to clear cart", "Close", {
              duration: 3000,
            });
          },
        );
    }
  }

  continueShipping(): void {
    this.router.navigate(["/checkout"]);
  }

  continueShopping(): void {
    this.router.navigate(["/products"]);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
