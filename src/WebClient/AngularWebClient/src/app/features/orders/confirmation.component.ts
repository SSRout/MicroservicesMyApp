import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { SharedModule } from "@shared/shared.module";

@Component({
  selector: "app-confirmation",
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.scss"],
})
export class ConfirmationComponent {
  constructor(private router: Router) {}

  viewOrders(): void {
    this.router.navigate(["/orders"]);
  }

  continueShopping(): void {
    this.router.navigate(["/products"]);
  }
}
