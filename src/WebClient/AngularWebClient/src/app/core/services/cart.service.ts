import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "@environments/environment";
import { IBasket, ICartItem } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private apiUrl = environment.apiUrl + environment.apiEndpoints.cart;
  private basketSubject = new BehaviorSubject<IBasket | null>(null);
  public basket$: Observable<IBasket | null> =
    this.basketSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadBasket();
  }

  /**
   * Load basket from server
   */
  loadBasket(): void {
    const username = this.getUsername();
    if (username) {
      this.http.get<IBasket>(`${this.apiUrl}/GetBasket/${username}`).subscribe(
        (basket) => this.basketSubject.next(basket),
        (error) => console.error("Failed to load basket", error),
      );
    }
  }

  /**
   * Get current basket value
   */
  getBasket(): IBasket | null {
    return this.basketSubject.value;
  }

  /**
   * Add item to cart
   */
  addToCart(item: ICartItem): Observable<IBasket> {
    const username = this.getUsername();
    const cartItem = { ...item, username };
    return this.http.post<IBasket>(`${this.apiUrl}/AddCart`, cartItem);
  }

  /**
   * Remove item from cart
   */
  removeFromCart(productId: string): Observable<void> {
    const username = this.getUsername();
    return this.http.delete<void>(
      `${this.apiUrl}/DeleteCart/${username}/${productId}`,
    );
  }

  /**
   * Update cart item quantity
   */
  updateCartItem(item: ICartItem): Observable<IBasket> {
    return this.http.put<IBasket>(`${this.apiUrl}/UpdateCart`, item);
  }

  /**
   * Clear basket
   */
  clearBasket(): Observable<void> {
    const username = this.getUsername();
    return this.http.delete<void>(`${this.apiUrl}/DeleteBasket/${username}`);
  }

  /**
   * Get total price
   */
  getTotalPrice(): number {
    const basket = this.basketSubject.value;
    if (!basket || !basket.items) {
      return 0;
    }
    return basket.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }

  /**
   * Get item count
   */
  getItemCount(): number {
    const basket = this.basketSubject.value;
    if (!basket || !basket.items) {
      return 0;
    }
    return basket.items.reduce((count, item) => count + item.quantity, 0);
  }

  /**
   * Update basket in local state
   */
  updateBasket(basket: IBasket): void {
    this.basketSubject.next(basket);
  }

  /**
   * Get username from session
   */
  private getUsername(): string {
    return sessionStorage.getItem("username") || "test-user";
  }
}
