import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { CatalogService } from "@core/services/catalog.service";
import { CartService } from "@core/services/cart.service";
import { IProduct, ICartItem } from "@core/models/models";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-product-detail",
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: IProduct | null = null;
  loading: boolean = true;
  quantity: number = 1;
  private destroy$ = new Subject<void>();

  constructor(
    private catalogService: CatalogService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const productId = params["id"];
      this.loadProduct(productId);
    });
  }

  loadProduct(productId: string): void {
    this.loading = true;
    this.catalogService
      .getProductById(productId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: IProduct) => {
          this.product = data;
          this.loading = false;
        },
        (error) => {
          console.error("Failed to load product", error);
          this.snackBar.open("Failed to load product", "Close", {
            duration: 3000,
          });
          this.loading = false;
        },
      );
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (!this.product) return;

    const cartItem: ICartItem = {
      id: this.product.id,
      productId: this.product.id,
      productName: this.product.name,
      price: this.product.price,
      quantity: this.quantity,
      imageFile: this.product.imageFile,
    };

    this.cartService
      .addToCart(cartItem)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (basket) => {
          this.cartService.updateBasket(basket);
          this.snackBar.open(
            `${this.quantity} item(s) added to cart!`,
            "Close",
            { duration: 3000 },
          );
          this.router.navigate(["/products"]);
        },
        (error) => {
          console.error("Failed to add product to cart", error);
          this.snackBar.open("Failed to add product to cart", "Close", {
            duration: 3000,
          });
        },
      );
  }

  goBack(): void {
    this.router.navigate(["/products"]);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
