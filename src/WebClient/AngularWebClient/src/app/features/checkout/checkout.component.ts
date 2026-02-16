import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { CartService } from "@core/services/cart.service";
import { OrderService } from "@core/services/order.service";
import { IBasketCheckout } from "@core/models/models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkoutForm!: FormGroup;
  isSubmitting: boolean = false;
  totalPrice: number = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.calculateTotal();
  }

  initializeForm(): void {
    this.checkoutForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      emailAddress: ["", [Validators.required, Validators.email]],
      shippingAddress: ["", Validators.required],
      country: ["", Validators.required],
      state: ["", Validators.required],
      zipCode: ["", Validators.required],
      cardName: ["", Validators.required],
      cardNumber: ["", [Validators.required, Validators.minLength(16)]],
      expiration: ["", Validators.required],
      cvv: ["", [Validators.required, Validators.minLength(3)]],
      paymentMethod: [1, Validators.required],
    });
  }

  calculateTotal(): void {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  submitOrder(): void {
    if (this.checkoutForm.invalid) {
      this.snackBar.open("Please fill out all required fields", "Close", {
        duration: 3000,
      });
      return;
    }

    this.isSubmitting = true;
    const basketCheckout: IBasketCheckout = {
      ...this.checkoutForm.value,
      userName: sessionStorage.getItem("username") || "test-user",
      totalPrice: this.totalPrice,
    };

    this.orderService
      .createOrder(basketCheckout)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) => {
          this.isSubmitting = false;
          if (response.success) {
            this.cartService.clearBasket().subscribe(() => {
              this.snackBar.open("Order placed successfully!", "Close", {
                duration: 3000,
              });
              this.router.navigate(["/confirmation"]);
            });
          } else {
            this.snackBar.open(
              response.message || "Failed to place order",
              "Close",
              { duration: 3000 },
            );
          }
        },
        (error) => {
          this.isSubmitting = false;
          console.error("Failed to place order", error);
          this.snackBar.open("Failed to place order", "Close", {
            duration: 3000,
          });
        },
      );
  }

  goBack(): void {
    this.router.navigate(["/cart"]);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
