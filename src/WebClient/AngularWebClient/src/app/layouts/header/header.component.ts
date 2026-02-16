import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { CartService } from "@core/services/cart.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  private destroy$ = new Subject<void>();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.basket$
      .pipe(takeUntil(this.destroy$))
      .subscribe((basket) => {
        this.cartItemCount = this.cartService.getItemCount();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
