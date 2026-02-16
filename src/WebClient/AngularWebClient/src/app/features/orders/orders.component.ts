import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { OrderService } from "@core/services/order.service";
import { IOrder } from "@core/models/models";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-orders",
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: IOrder[] = [];
  loading: boolean = true;
  private destroy$ = new Subject<void>();

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    const username = sessionStorage.getItem("username") || "test-user";
    this.orderService
      .getOrdersByUsername(username)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: IOrder[]) => {
          this.orders = data;
          this.loading = false;
        },
        (error) => {
          console.error("Failed to load orders", error);
          this.snackBar.open("Failed to load orders", "Close", {
            duration: 3000,
          });
          this.loading = false;
        },
      );
  }

  viewOrderDetails(orderId: string): void {
    this.router.navigate(["/orders", orderId]);
  }

  continueShopping(): void {
    this.router.navigate(["/products"]);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
