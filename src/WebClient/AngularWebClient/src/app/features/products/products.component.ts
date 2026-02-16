import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { CatalogService } from "@core/services/catalog.service";
import { CartService } from "@core/services/cart.service";
import { IProduct, ICartItem } from "@core/models/models";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  loading: boolean = true;
  searchTerm: string = "";
  selectedCategory: string = "";
  filteredProducts: IProduct[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private catalogService: CatalogService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.catalogService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: IProduct[]) => {
          this.products = data;
          this.filteredProducts = data;
          this.loading = false;
        },
        (error) => {
          console.error("Failed to load products", error);
          this.snackBar.open("Failed to load products", "Close", {
            duration: 3000,
          });
          this.loading = false;
        },
      );
  }

  onSearch(): void {
    this.filterProducts();
  }

  onCategoryChange(): void {
    this.filterProducts();
  }

  private filterProducts(): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchesCategory =
        !this.selectedCategory || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  addToCart(product: IProduct): void {
    const cartItem: ICartItem = {
      id: product.id,
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      imageFile: product.imageFile,
    };

    this.cartService
      .addToCart(cartItem)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (basket) => {
          this.cartService.updateBasket(basket);
          this.snackBar.open("Product added to cart!", "Close", {
            duration: 3000,
          });
        },
        (error) => {
          console.error("Failed to add product to cart", error);
          this.snackBar.open("Failed to add product to cart", "Close", {
            duration: 3000,
          });
        },
      );
  }

  viewProductDetails(productId: string): void {
    this.router.navigate(["/products", productId]);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
